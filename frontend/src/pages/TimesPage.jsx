import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import TimeList from "../features/times/TimeList";
import PersonalBestSummary from "../features/times/PersonalBestSummary";
import TimeFilters from "../features/times/TimeFilters";
import EventProgression from "../features/times/EventProgression";


function TimesPage() {
  return (
    <Authenticator>
      {({ user }) => <TimesContent user={user} />}
    </Authenticator>
  );
}

function TimesContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("pbs");
  const [profile, setProfile] = useState(null);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    event: "",
    meetName: "",
    course: "",
    sortBy: "recent",
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

      const timesResult = await client.models.RaceTime.list({
        filter: {
          swimmerId: { eq: userProfile.id },
        },
      });

      setTimes(
        (timesResult.data || []).sort(
          (a, b) => new Date(b.raceDate) - new Date(a.raceDate)
        )
      );
    } catch (error) {
      console.error("Error loading times:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTime(race) {
    const confirmed = window.confirm(
        `Delete ${race.event} from ${race.meetName || "this meet"}?`
    );

    if (!confirmed) return;

    try {
        await client.models.RaceTime.delete({ id: race.id });

        setTimes((current) => current.filter((item) => item.id !== race.id));
    } catch (error) {
        console.error("Error deleting time:", error);
        alert("Could not delete time.");
    }
    }

  const events = [...new Set(times.map((time) => time.event).filter(Boolean))];
  const meets = [...new Set(times.map((time) => time.meetName).filter(Boolean))];

  const filteredTimes = times
    .filter((race) => {
      return (
        (filters.event === "" || race.event === filters.event) &&
        (filters.meetName === "" || race.meetName === filters.meetName) &&
        (filters.course === "" || race.course === filters.course)
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "fastest") {
        return a.timeInSeconds - b.timeInSeconds;
      }

      if (filters.sortBy === "oldest") {
        return new Date(a.raceDate) - new Date(b.raceDate);
      }

      return new Date(b.raceDate) - new Date(a.raceDate);
    });

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading times...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">SwimSync Times</span>
        <BackButton
          onClick={() => navigate("/dashboard")}
          label="Back to Dashboard"
        />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Race Times"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
          action={
            <button
              className="btn btn-primary"
              onClick={() => navigate("/times/new")}
            >
              + Add Time
            </button>
          }
        />

        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "pbs" ? "active" : ""}`}
              onClick={() => setActiveTab("pbs")}
            >
              Personal Bests
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Time History
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "progression" ? "active" : ""
              }`}
              onClick={() => setActiveTab("progression")}
            >
              Event Progression
            </button>
          </li>
        </ul>

        {activeTab === "pbs" && <PersonalBestSummary times={times} />}

        {activeTab === "history" && (
          <>
            <TimeFilters
              filters={filters}
              setFilters={setFilters}
              events={events}
              meets={meets}
            />

            <h3 className="fw-bold mb-3">Time History</h3>
            <TimeList times={filteredTimes} 
                canEdit
                onEdit={(race) => navigate(`/times/${race.id}/edit`)}
                onDelete={handleDeleteTime}/>
            </>
        )}

        {activeTab === "progression" && (
            <EventProgression times={times} />
        )}

      </main>
    </div>
  );
}

export default TimesPage;