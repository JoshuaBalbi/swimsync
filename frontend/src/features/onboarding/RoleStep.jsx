import SelectableCard from "../../components/ui/SelectableCard";

function RoleStep({ formData, setFormData, onNext, onBack }) {
  return (
    <>
      <h4 className="fw-bold mb-3">Choose Your Role</h4>

      <div className="row g-4">
        <div className="col-md-6">
          <SelectableCard
            title="Coach"
            description="Create teams, post practices, track attendance, manage meets, and view swimmer progress."
            icon="🧑‍🏫"
            selected={formData.role === "coach"}
            onClick={() => setFormData({ ...formData, role: "coach" })}
          />
        </div>

        <div className="col-md-6">
          <SelectableCard
            title="Swimmer"
            description="Join a team, log training, view practices, and track personal performance."
            icon="🏊"
            selected={formData.role === "swimmer"}
            onClick={() => setFormData({ ...formData, role: "swimmer" })}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Back
        </button>

        <button className="btn btn-primary px-4" onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default RoleStep;