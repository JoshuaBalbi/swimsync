import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import SwimmerRosterList from "../features/swimmers/SwimmerRosterList";

function SwimmersPage() {
  return (
    <Authenticator>
      {({ user }) => <SwimmersContent user={user} />}
    </Authenticator>
  );
}

function SwimmersContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [swimmers, setSwimmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSwimmers();
  }, []);

  async function loadSwimmers() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const userProfile = profileResult.data[0];

      if (userProfile.role !== "coach") {
        alert("Only coaches can view swimmers.");
        navigate("/dashboard");
        return;
      }

      setProfile(userProfile);

      const membershipResult = await client.models.TeamMembership.list({
        filter: {
          teamId: { eq: userProfile.activeTeamId },
        },
      });

      const approvedSwimmers = (membershipResult.data || []).filter(
        (member) =>
          member.status === "approved" && member.role === "swimmer"
      );

      setSwimmers(approvedSwimmers);
    } catch (error) {
      console.error("Error loading swimmers:", error);
      alert("Could not load swimmers.");
    } finally {
      setLoading(false);
    }
  }

  function handleViewProfile(swimmer) {
    navigate(`/swimmers/${swimmer.userProfileId}`);
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading swimmers...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">SwimSync Swimmers</span>
        <BackButton
          onClick={() => navigate("/dashboard")}
          label="Back to Dashboard"
        />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Swimmers"
          subtitle={`Approved swimmers on your team • ${user?.signInDetails?.loginId}`}
        />

        <SwimmerRosterList
          swimmers={swimmers}
          onViewProfile={handleViewProfile}
        />
      </main>
    </div>
  );
}

export default SwimmersPage;