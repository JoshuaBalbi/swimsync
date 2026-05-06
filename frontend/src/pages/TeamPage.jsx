import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import TeamInfoCard from "../features/team/TeamInfoCard";
import PendingRequests from "../features/team/PendingRequests";
import TeamMembersList from "../features/team/TeamMembersList";

function TeamPage() {
  return (
    <Authenticator>
      {({ user }) => <TeamContent user={user} />}
    </Authenticator> 
  );
}

function TeamContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [team, setTeam] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamData();
  }, []);

  async function loadTeamData() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const userProfile = profileResult.data[0];
      setProfile(userProfile);

      if (userProfile.role !== "coach") {
        alert("Only coaches can access team management.");
        navigate("/dashboard");
        return;
      }

      if (!userProfile.activeTeamId) {
        alert("No active team found for this coach.");
        navigate("/dashboard");
        return;
      }

      const teamResult = await client.models.Team.get({
        id: userProfile.activeTeamId,
      });

      setTeam(teamResult.data);

      const membershipResult = await client.models.TeamMembership.list({
        filter: {
          teamId: { eq: userProfile.activeTeamId },
        },
      });

      const memberships = membershipResult.data || [];

      setPendingRequests(
        memberships.filter((member) => member.status === "pending")
      );

      setApprovedMembers(
        memberships.filter((member) => member.status === "approved")
      );
    } catch (error) {
      console.error("Error loading team data:", error);
      alert("Could not load team data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(request) {
    try {
      const result = await client.models.TeamMembership.update({
        id: request.id,
        status: "approved",
      });

      if (!result.data) {
        alert("Could not approve request.");
        return;
      }

      await client.models.UserProfile.update({
        id: request.userProfileId,
        activeTeamId: request.teamId,
      });

      loadTeamData();
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Could not approve request.");
    }
  }

  async function handleReject(request) {
    try {
      const result = await client.models.TeamMembership.update({
        id: request.id,
        status: "rejected",
      });

      if (!result.data) {
        alert("Could not reject request.");
        return;
      }

      loadTeamData();
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Could not reject request.");
    }
  }


  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading team...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">SwimSync Team</span>
        <BackButton onClick={() => navigate("/dashboard")} label="Back to Dashboard" />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Team Management"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
        />

        <TeamInfoCard team={team} />

        <h3 className="fw-bold mb-3">Pending Join Requests</h3>
        <PendingRequests
          requests={pendingRequests}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        <h3 className="fw-bold mt-5 mb-3">Approved Team Members</h3>
        <TeamMembersList
          members={approvedMembers}
        />
      </main>
    </div>
  );
}

export default TeamPage;