import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import MeetList from "../features/meets/MeetList";

function MeetsPage() {
  return (
    <Authenticator>
      {({ user }) => <MeetsContent user={user} />}
    </Authenticator>
  );
}

function MeetsContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeets();
  }, []);

  async function loadMeets() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const userProfile = profileResult.data[0];
      setProfile(userProfile);

      const meetResult = await client.models.Meet.list({
        filter: {
          teamId: { eq: userProfile.activeTeamId },
        },
      });

      const sortedMeets = (meetResult.data || []).sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );

      setMeets(sortedMeets);
    } catch (error) {
      console.error("Error loading meets:", error);
      alert("Could not load meets.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading meets...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">SwimSync Meets</span>
        <BackButton onClick={() => navigate("/dashboard")} label="Back to Dashboard" />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Meets"
          subtitle={`Upcoming team meets • Logged in as ${user?.signInDetails?.loginId}`}
          action={
            profile?.role === "coach" && (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/meets/new")}
              >
                + Create Meet
              </button>
            )
          }
        />

        <MeetList
          meets={meets}
          onView={(meet) => navigate(`/meets/${meet.id}`)}
        />
      </main>
    </div>
  );
}

export default MeetsPage;