import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import MeetForm from "../features/meets/MeetForm";

function CreateMeetPage() {
  return (
    <Authenticator>
      {({ user }) => <CreateMeetContent user={user} />}
    </Authenticator>
  );
}

function CreateMeetContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const result = await client.models.UserProfile.list();

      if (result.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const userProfile = result.data[0];

      if (userProfile.role !== "coach") {
        alert("Only coaches can create meets.");
        navigate("/meets");
        return;
      }

      setProfile(userProfile);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  }

  async function handleCreateMeet(formData) {
    try {
      setSaving(true);

      const result = await client.models.Meet.create({
        teamId: profile.activeTeamId,
        name: formData.name,
        description: formData.description,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        course: formData.course,
        createdByCoachId: profile.id,
        createdByCoachName: `${profile.firstName} ${profile.lastName}`,
      });

      if (!result.data) {
        alert("Could not create meet.");
        return;
      }

      navigate(`/meets/${result.data.id}`);
    } catch (error) {
      console.error("Error creating meet:", error);
      alert("Could not create meet.");
    } finally {
      setSaving(false);
    }
  }

  if (loadingProfile) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading create meet page...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">Create Meet</span>
        <BackButton onClick={() => navigate("/meets")} />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Create Meet"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
        />

        <MeetForm onSubmit={handleCreateMeet} loading={saving} />
      </main>
    </div>
  );
}

export default CreateMeetPage;