import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";

function EditPracticePage() {
  return (
    <Authenticator>
      {({ user }) => <EditPracticeContent user={user} />}
    </Authenticator>
  );
}

function EditPracticeContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const [practice, setPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPractice();
  }, []);

  async function loadPractice() {
    try {
      const result = await client.models.Practice.get({ id });

      if (!result.data) {
        alert("Practice not found.");
        navigate("/practices");
        return;
      }

      setPractice(result.data);
    } catch (error) {
      console.error("Error loading practice:", error);
      alert("Could not load practice.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setPractice({
      ...practice,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const updatedPractice = {
        id: practice.id,
        title: practice.title,
        date: practice.date,
        type: practice.type,
        focus: practice.focus,
        totalAmount: practice.totalAmount,
        mainSet: practice.mainSet,
        workoutText: practice.workoutText,
        notes: practice.notes,
        visibility: practice.visibility,
        teamId: practice.teamId,
        coachId: practice.coachId,
        coachName: practice.coachName,
      };

      const result = await client.models.Practice.update(updatedPractice);

      if (!result.data) {
        alert("Practice could not be updated.");
        return;
      }

      navigate("/practices");
    } catch (error) {
      console.error("Error updating practice:", error);
      alert("Could not update practice.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading practice...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">Edit Practice</span>
        <BackButton onClick={() => navigate("/practices")} />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Edit Practice"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
        />

        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Practice Title</label>
                  <input
                    name="title"
                    className="form-control"
                    value={practice.title || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input
                    name="date"
                    type="date"
                    className="form-control"
                    value={practice.date || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    className="form-select"
                    value={practice.type || "Swim"}
                    onChange={handleChange}
                  >
                    <option>Swim</option>
                    <option>Lift</option>
                    <option>Dryland</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Focus</label>
                  <select
                    name="focus"
                    className="form-select"
                    value={practice.focus || "Sprint"}
                    onChange={handleChange}
                  >
                    <option>Sprint</option>
                    <option>Distance</option>
                    <option>IM</option>
                    <option>Recovery</option>
                    <option>Strength</option>
                    <option>Technique</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Yardage / Duration</label>
                  <input
                    name="totalAmount"
                    className="form-control"
                    value={practice.totalAmount || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Main Set Summary</label>
                  <input
                    name="mainSet"
                    className="form-control"
                    value={practice.mainSet || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Full Practice</label>
                  <textarea
                    name="workoutText"
                    className="form-control"
                    rows="8"
                    value={practice.workoutText || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Coach Notes</label>
                  <textarea
                    name="notes"
                    className="form-control"
                    rows="3"
                    value={practice.notes || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Visibility</label>
                  <select
                    name="visibility"
                    className="form-select"
                    value={practice.visibility || "private"}
                    onChange={handleChange}
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>

              <button className="btn btn-primary mt-4 px-4" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditPracticePage;