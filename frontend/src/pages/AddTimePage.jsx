import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import TimeForm from "../features/times/TimeForm";

function AddTimePage() {
  return (
    <Authenticator>
      {({ user }) => <AddTimeContent user={user} />}
    </Authenticator>
  );
}

function AddTimeContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      setProfile(profileResult.data[0]);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  }

  async function handleAddTime(formData) {
    try {
      const raceData = {
        meetId: null,
        meetName: formData.meetName,

        swimmerId: profile.id,
        swimmerName: `${profile.firstName} ${profile.lastName}`,
        teamId: profile.activeTeamId || null,

        event: formData.event,
        stroke: formData.stroke,
        distance: formData.distance,
        course: formData.course,

        time: formData.time,
        timeInSeconds: formData.timeInSeconds,

        raceDate: formData.raceDate,
        location: formData.location,
        notes: formData.notes,
      };

      const result = await client.models.RaceTime.create(raceData);
      console.log("Updating race with:", updatedRace);
      if (!result.data) {
        alert("Could not save race time.");
        return;
      }

      navigate("/times");
    } catch (error) {
      console.error("Error saving race time:", error);
      alert("Could not save race time.");
    }
  }

  if (loadingProfile) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading add time page...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">Add Race Time</span>
        <BackButton onClick={() => navigate("/times")} />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Add Race Time"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
        />

        <TimeForm onAddTime={handleAddTime} />
      </main>
    </div>
  );
}

export default AddTimePage;