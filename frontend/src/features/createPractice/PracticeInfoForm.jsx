import { useState } from "react";
import PracticeSectionBuilder from "./PracticeSectionBuilder";

function PracticeInfoForm({ onCreatePractice }) {
  const [structuredSets, setStructuredSets] = useState({});

  const generatedWorkout = formatStructuredSets(structuredSets);
  const calculatedYardage = calculateTotalYardage(structuredSets);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type: "Swim",
    focus: "Sprint",
    totalAmount: "",
    mainSet: "",
    workoutText: "",
    notes: "",
    isPublic: false,
    entryMode: "manual",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function formatStructuredSets(structuredSets) {
    if (!structuredSets) return "";

    function formatSection(title, sets) {
      if (!sets || sets.length === 0) return "";

      const lines = sets.map((set) => {
        const reps = set.reps || "";
        const distance = set.distance || "";
        const stroke = set.stroke || "";
        const interval = set.interval ? ` @ ${set.interval}` : "";
        const notes = set.notes ? ` (${set.notes})` : "";

        return `${reps} x ${distance} ${stroke}${interval}${notes}`;
      });

      return `${title}:\n${lines.join("\n")}`;
    }

    return [
      formatSection("Warmup", structuredSets.warmup),
      formatSection("Pre-set", structuredSets.preset),
      formatSection("Main Set", structuredSets.mainSet),
      formatSection("Post-set", structuredSets.postset),
      formatSection("Warmdown", structuredSets.warmdown),
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  function calculateTotalYardage(structuredSets) {
    if (!structuredSets) return 0;

    return Object.values(structuredSets)
      .flat()
      .reduce((total, set) => {
        const reps = Number(set.reps) || 0;
        const distance = Number(set.distance) || 0;
        return total + reps * distance;
      }, 0);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const generatedWorkout = formatStructuredSets(structuredSets);

    if (formData.entryMode === "manual" && !formData.workoutText) {
      alert("Please type a practice.");
      return;
    }

    if (formData.entryMode === "builder" && !generatedWorkout) {
      alert("Please add at least one structured set.");
      return;
    }

    const finalData = {
      ...formData,
      workoutText:
        formData.entryMode === "builder"
          ? generatedWorkout
          : formData.workoutText,
      totalAmount:
        formData.entryMode === "builder" && calculatedYardage > 0
          ? `${calculatedYardage} yards`
          : formData.totalAmount,
    };

    onCreatePractice(finalData);

    setFormData({
      title: "",
      date: "",
      type: "Swim",
      focus: "Sprint",
      totalAmount: "",
      mainSet: "",
      workoutText: "",
      notes: "",
      isPublic: false,
    });

    setStructuredSets({});
  }

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-body p-4">
        <h3 className="fw-bold text-primary mb-3">Create Practice</h3>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Practice Title</label>
              <input
                name="title"
                className="form-control"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Monday Sprint Practice"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                name="date"
                type="date"
                className="form-control"
                value={formData.date || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Type</label>
              <select
                name="type"
                className="form-select"
                value={formData.type || "Swim"}
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
                value={formData.focus || "Sprint"}
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
                value={formData.totalAmount || ""}
                onChange={handleChange}
                placeholder="5000 yards or 60 min"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Main Set Summary</label>
              <input
                name="mainSet"
                className="form-control"
                value={formData.mainSet || ""}
                onChange={handleChange}
                placeholder="Example: 8 x 100 free @ 1:20"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Practice Entry Method</label>

              <div className="btn-group w-100" role="group">
                <button
                  type="button"
                  className={`btn ${
                    formData.entryMode === "manual"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      entryMode: "manual",
                    })
                  }
                >
                  Type Practice Manually
                </button>

                <button
                  type="button"
                  className={`btn ${
                    formData.entryMode === "builder"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      entryMode: "builder",
                    })
                  }
                >
                  Use Structured Builder
                </button>
              </div>
            </div>

            {formData.entryMode === "manual" && (
              <div className="col-12">
                <label className="form-label">Full Practice</label>
                <textarea
                  name="workoutText"
                  className="form-control"
                  rows="7"
                  value={formData.workoutText || ""}
                  onChange={handleChange}
                  placeholder={`Warmup:\nPre-set:\nMain Set:\nPost-set:\nWarmdown:`}
                />
              </div>
            )}

            {formData.entryMode === "builder" && (
              <div className="col-12">
                <PracticeSectionBuilder onChange={setStructuredSets} />

                <div className="card border-0 shadow-sm rounded-4 mt-4">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="fw-bold text-primary mb-0">Practice Preview</h4>

                      {calculatedYardage > 0 && (
                        <span className="badge bg-primary-subtle text-primary">
                          {calculatedYardage} yards
                        </span>
                      )}
                    </div>

                    {generatedWorkout ? (
                      <pre className="bg-light p-3 rounded-3 text-wrap mb-0">
                        {generatedWorkout}
                      </pre>
                    ) : (
                      <p className="text-muted mb-0">
                        Add structured sets to preview the practice here.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}


            <div className="col-12">
              <label className="form-label">Coach Notes</label>
              <textarea
                name="notes"
                className="form-control"
                rows="3"
                value={formData.notes || ""}
                onChange={handleChange}
                placeholder="Optional notes for swimmers..."
              />
            </div>
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              id="isPublic"
            />

            <label className="form-check-label" htmlFor="isPublic">
              Make this practice public
            </label>

            <div className="form-text">
              Public practices can be viewed by independent swimmers. Private practices are for your team.
            </div>
          </div>

          <button className="btn btn-primary mt-4 px-4" type="submit">
            Save Practice
          </button>
        </form>
      </div>
    </div>
  );
}

export default PracticeInfoForm;