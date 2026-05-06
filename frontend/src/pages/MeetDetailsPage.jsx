import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import BadgePill from "../components/ui/BadgePill";

import MeetFileUpload from "../features/meets/MeetFileUpload";
import MeetFileList from "../features/meets/MeetFileList";
import MeetAvailabilityForm from "../features/meets/MeetAvailabilityForm";
import MeetAvailabilitySummary from "../features/meets/MeetAvailabilitySummary";
import MeetEventRequestForm from "../features/meets/MeetEventRequestForm";
import MeetEventRequestsList from "../features/meets/MeetEventRequestsList";
import MyMeetEventRequests from "../features/meets/MyMeetEventRequests";

function MeetDetailsPage() {
  return (
    <Authenticator>
      {({ user }) => <MeetDetailsContent user={user} />}
    </Authenticator>
  );
}

function MeetDetailsContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [meet, setMeet] = useState(null);
  const [files, setFiles] = useState([]);

  const [availabilityRequest, setAvailabilityRequest] = useState(null);
  const [myEventRequests, setMyEventRequests] = useState([]);

  const [approvedSwimmers, setApprovedSwimmers] = useState([]);
  const [meetRequests, setMeetRequests] = useState([]);
  const [swimmerTimes, setSwimmerTimes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetDetails();
  }, []);

  async function loadMeetDetails() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const userProfile = profileResult.data[0];
      setProfile(userProfile);

      const meetResult = await client.models.Meet.get({ id });

      if (!meetResult.data) {
        alert("Meet not found.");
        navigate("/meets");
        return;
      }

      const selectedMeet = meetResult.data;
      setMeet(selectedMeet);

      const fileResult = await client.models.MeetFile.list({
        filter: {
          meetId: { eq: id },
        },
      });

      setFiles(fileResult.data || []);

      if (userProfile.role === "coach") {
        const membershipResult = await client.models.TeamMembership.list({
          filter: {
            teamId: { eq: selectedMeet.teamId },
          },
        });

        const swimmers = (membershipResult.data || []).filter(
          (member) =>
            member.status === "approved" && member.role === "swimmer"
        );

        setApprovedSwimmers(swimmers);

        const requestResult = await client.models.MeetEventRequest.list({
          filter: {
            meetId: { eq: id },
          },
        });

        setMeetRequests(requestResult.data || []);
      }

      if (userProfile.role === "swimmer") {
        const requestResult = await client.models.MeetEventRequest.list({
          filter: {
            meetId: { eq: id },
            swimmerId: { eq: userProfile.id },
          },
        });

        const allMyRequests = requestResult.data || [];

        setAvailabilityRequest(
          allMyRequests.find((request) => !request.event) || null
        );

        setMyEventRequests(
          allMyRequests.filter((request) => request.event)
        );

        const timesResult = await client.models.RaceTime.list({
          filter: {
            swimmerId: { eq: userProfile.id },
            course: { eq: selectedMeet.course },
          },
        });

        setSwimmerTimes(timesResult.data || []);
      }
    } catch (error) {
      console.error("Error loading meet details:", error);
      alert("Could not load meet details.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUploaded(fileData) {
    try {
      const result = await client.models.MeetFile.create({
        meetId: meet.id,
        ...fileData,
      });

      if (!result.data) {
        alert("File uploaded to S3 but metadata could not be saved.");
        return;
      }

      setFiles((current) => [result.data, ...current]);
    } catch (error) {
      console.error("Error saving file metadata:", error);
      alert("Could not save file metadata.");
    }
  }

  async function handleAvailabilitySubmit(data) {
    try {
      const requestData = {
        meetId: meet.id,
        swimmerId: profile.id,
        swimmerName: `${profile.firstName} ${profile.lastName}`,
        teamId: profile.activeTeamId,
        availability: data.availability,
        event: null,
        bestTime: null,
        bestTimeRaceId: null,
        notes: data.notes,
        status: "requested",
      };

      let result;

      if (availabilityRequest?.id) {
        result = await client.models.MeetEventRequest.update({
          id: availabilityRequest.id,
          ...requestData,
        });
      } else {
        result = await client.models.MeetEventRequest.create(requestData);
      }

      if (!result.data) {
        alert("Could not save availability.");
        return;
      }

      setAvailabilityRequest(result.data);
      alert("Availability saved.");
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Could not save availability.");
    }
  }

  async function handleEventRequestSubmit(data) {
    try {
      const requestData = {
        meetId: meet.id,
        swimmerId: profile.id,
        swimmerName: `${profile.firstName} ${profile.lastName}`,
        teamId: profile.activeTeamId,
        availability: availabilityRequest?.availability || "attending",
        event: data.event,
        bestTime: data.bestTime,
        bestTimeRaceId: data.bestTimeRaceId,
        notes: data.notes,
        status: "requested",
      };

      const result = await client.models.MeetEventRequest.create(requestData);

      if (!result.data) {
        alert("Could not submit event request.");
        return;
      }

      setMyEventRequests((current) => [...current, result.data]);
      alert("Event request submitted.");
    } catch (error) {
      console.error("Error submitting event request:", error);
      alert("Could not submit event request.");
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading meet...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">Meet Details</span>
        <BackButton onClick={() => navigate("/meets")} label="Back to Meets" />
      </nav>

      <main className="container py-5">
        <PageHeader
          title={meet.name}
          subtitle={`${meet.location || "No location"} • ${meet.startDate}`}
        />

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <div className="mb-3">
              <BadgePill variant="secondary">{meet.course}</BadgePill>
            </div>

            <p className="text-muted mb-0">
              {meet.description || "No description added."}
            </p>
          </div>
        </div>

        {profile?.role === "coach" && (
          <>
            <MeetAvailabilitySummary
              swimmers={approvedSwimmers}
              requests={meetRequests}
            />

            <MeetEventRequestsList requests={meetRequests} />

            <MeetFileUpload
              meetId={meet.id}
              coachId={profile.id}
              onUploaded={handleFileUploaded}
            />
          </>
        )}

        <MeetFileList files={files} />

        {profile?.role === "swimmer" && (
          <>
            <MeetAvailabilityForm
              existingRequest={availabilityRequest}
              onSubmit={handleAvailabilitySubmit}
            />

            <MyMeetEventRequests requests={myEventRequests} />

            <MeetEventRequestForm
              meet={meet}
              swimmerTimes={swimmerTimes}
              onSubmit={handleEventRequestSubmit}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default MeetDetailsPage;