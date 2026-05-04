import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PracticeInfoForm from "../features/createPractice/PracticeInfoForm";
import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";

function CreatePracticePage() {
  return (
    <Authenticator>
      {({ user }) => <CreatePracticeContent user={user} />}
    </Authenticator>
  );
}

function CreatePracticeContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        navigate("/practices");
        return;
      }

      setProfile(userProfile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

    async function handleCreatePractice(formData) {
    try {
        setLoading(true);

        const practiceData = {
        title: formData.title,
        date: formData.date,
        type: formData.type,
        focus: formData.focus,
        totalAmount: formData.totalAmount,
        mainSet: formData.mainSet,
        workoutText: formData.workoutText,
        notes: formData.notes,

        visibility: formData.isPublic ? "public" : "private",
        teamId: profile?.activeTeamId || null,
        coachId: profile?.id,
        coachName: `${profile?.firstName} ${profile?.lastName}`,
        };

        console.log("Practice data being saved:", practiceData);

        const result = await client.models.Practice.create(practiceData);

        console.log("Create practice result:", result);

        if (!result.data) {
        console.error("Failed result:", result);
        alert("Failed to create practice");
        return;
        }

        navigate("/practices");
    } catch (error) {
        console.error("Error creating practice:", error);
        alert("Could not create practice.");
    } finally {
        setLoading(false);
    }
    }

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold">Create Practice</span>
        <BackButton onClick={() => navigate("/practices")} />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Create Practice"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
        />

        <PracticeInfoForm onCreatePractice={handleCreatePractice} />
      </main>
    </div>
  );
}

export default CreatePracticePage;