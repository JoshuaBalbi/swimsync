import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import PracticeList from "../features/practices/PracticeList";
import PracticeFilters from "../features/practices/PracticeFilters";


function PracticesPage() {
    
  return (
    <Authenticator>
      {({ user }) => <PracticesContent user={user} />}
    </Authenticator>
  );
}

function PracticesContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isApprovedForTeam, setIsApprovedForTeam] = useState(false);

  const [filters, setFilters] = useState({
    type: "",
    focus: "",
    teamScope: "",
  });

  const filteredPractices = practices.filter((practice) => {
    const isApprovedTeamPractice =
      isApprovedForTeam &&
      practice.teamId &&
      practice.teamId === profile?.activeTeamId;

    const isOtherTeamPractice =
      practice.visibility === "public" &&
      (!isApprovedForTeam || practice.teamId !== profile?.activeTeamId);

    return (
      (filters.type === "" || practice.type === filters.type) &&
      (filters.focus === "" || practice.focus === filters.focus) &&
      (filters.teamScope === "" ||
        (filters.teamScope === "your" && isApprovedTeamPractice) ||
        (filters.teamScope === "other" && isOtherTeamPractice))
    );
  });

  useEffect(() => {
    loadPageData();
  }, []);

  async function loadPageData() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const userProfile = profileResult.data[0];
      setProfile(userProfile);

      let practiceResult;

      if (userProfile.role === "coach") {
        practiceResult = await client.models.Practice.list({
          filter: {
            coachId: { eq: userProfile.id },
          },
        });
      } else {
        const membershipResult = await client.models.TeamMembership.list({
          filter: {
            userProfileId: { eq: userProfile.id },
          },
        });

        const approvedMembership = membershipResult.data.find(
          (membership) =>
            membership.teamId === userProfile.activeTeamId &&
            membership.status === "approved"
        );

        setIsApprovedForTeam(Boolean(approvedMembership));

        if (approvedMembership) {
          practiceResult = await client.models.Practice.list({
            filter: {
              or: [
                { teamId: { eq: userProfile.activeTeamId } },
                { visibility: { eq: "public" } },
              ],
            },
          });
        } else {
          practiceResult = await client.models.Practice.list({
            filter: {
              visibility: { eq: "public" },
            },
          });
        }
      }


      setPractices(practiceResult.data || []);
    } catch (error) {
      console.error("Error loading practices:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePractice(practice) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${practice.title}"?`
    );

    if (!confirmed) return;

    try {
      await client.models.Practice.delete({ id: practice.id });

      setPractices((currentPractices) =>
        currentPractices.filter((item) => item.id !== practice.id)
      );
    } catch (error) {
      console.error("Error deleting practice:", error);
      alert("Could not delete practice.");
    }
  }

  async function handleCreatePractice(formData) {
    try {
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

      const result = await client.models.Practice.create(practiceData);

      if (!result.data) {
        console.error("Practice was not created:", result);
        alert("Practice could not be saved. Check console for details.");
        return;
      }

      setPractices([result.data, ...practices]);
    } catch (error) {
      console.error("Error creating practice:", error);
      alert("Could not create practice.");
    }
  }


  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading practices...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">SwimSync Practices</span>

        <button className="btn btn-light" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Practices"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
          action={
            profile?.role === "coach" && (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/practices/new")}
              >
                + Create Practice
              </button>
            )
          }
        />

        {profile?.role === "swimmer" && (
          <div className="alert alert-info rounded-4">
            Approved swimmers can view team practices. Pending or independent swimmers can only view public practices.
          </div>
        )}

        <h3 className="fw-bold mb-3">
          {profile?.role === "coach" ? "Your Posted Practices" : "Available Practices"}
        </h3>

        <PracticeFilters filters={filters} setFilters={setFilters} />

        <PracticeList
          practices={filteredPractices}
          canEdit={profile?.role === "coach"}
          onEdit={(practice) => navigate(`/practices/${practice.id}/edit`)}
          onDelete={handleDeletePractice}
        />
      </main>
    </div>
  );
}

export default PracticesPage;