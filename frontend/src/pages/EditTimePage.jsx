import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import TimeForm from "../features/times/TimeForm";

function EditTimePage() {
  return (
    <Authenticator>
      {({ user }) => <EditTimeContent user={user} />}
    </Authenticator>
  );
}

function EditTimeContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRace();
  }, []);

  async function loadRace() {
    try {
      const result = await client.models.RaceTime.get({ id });

      if (!result.data) {
        alert("Race time not found.");
        navigate("/times");
        return;
      }

      setRace(result.data);
    } catch (error) {
      console.error("Error loading race time:", error);
      alert("Could not load race time.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTime(formData) {
    try {
      const updatedRace = {
        id: race.id,
        meetId: race.meetId || null,
        meetName: formData.meetName,
        swimmerId: race.swimmerId,
        swimmerName: race.swimmerName,
        teamId: race.teamId || null,
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

      console.log("Updating race with:", updatedRace);

      const result = await client.models.RaceTime.update(updatedRace);

      console.log("Update result:", result);

      if (!result.data) {
        alert("Could not update race time.");
        return;
      }

      navigate("/times");
    } catch (error) {
      console.error("Error updating race time:", error);
      alert("Could not update race time.");
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading race time...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">Edit Race Time</span>
        <BackButton onClick={() => navigate("/times")} />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Edit Race Time"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
        />

        <TimeForm
          onAddTime={handleUpdateTime}
          initialData={race}
          submitLabel="Save Changes"
        />
      </main>
    </div>
  );
}

export default EditTimePage;