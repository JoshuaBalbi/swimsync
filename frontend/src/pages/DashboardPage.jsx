import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import CoachDashboard from "../features/dashboard/CoachDashboard";
import SwimmerDashboard from "../features/dashboard/SwimmerDashboard";



function DashboardPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const mode = params.get("mode");

  return (
    <Authenticator initialState={mode === "signup" ? "signUp" : "signIn"}>
      {({ signOut, user }) => (
        <DashboardContent signOut={signOut} user={user} navigate={navigate} />
      )}
    </Authenticator>
  );
}

function DashboardContent({ signOut, user, navigate }) {
  const client = generateClient();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const result = await client.models.UserProfile.list();
        if (result.data.length === 0) {
          navigate("/onboarding");
          return;
        }

        setProfile(result.data[0]);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading dashboard...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">SwimSync</span>

        <button className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <main className="container py-5">
        <h1 className="fw-bold text-primary">
          Welcome to SwimSync
        </h1>

        <p className="text-muted">
          Logged in as {user?.signInDetails?.loginId}
        </p>

        <p className="text-muted">
          Role: <span className="fw-bold text-capitalize">{profile?.role}</span>
        </p>

        {profile?.role === "coach" ? <CoachDashboard /> : <SwimmerDashboard />}
      </main>
    </div>
  );
}

export default DashboardPage;