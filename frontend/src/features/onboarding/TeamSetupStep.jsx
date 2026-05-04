import SelectableCard from "../../components/ui/SelectableCard";
import FormInput from "../../components/ui/FormInput";

function TeamSetupStep({
  formData,
  setFormData,
  onChange,
  onBack,
  onSubmit,
  loading,
}) {
  return (
    <>
      <h4 className="fw-bold mb-3">Team Setup</h4>

      <div className="row g-3">
        {formData.role === "coach" && (
          <div className="col-md-6">
            <SelectableCard
              title="Create Team"
              description="Become the head coach of a new team."
              icon="🏆"
              selected={formData.teamChoice === "createTeam"}
              onClick={() =>
                setFormData({ ...formData, teamChoice: "createTeam" })
              }
            />
          </div>
        )}

        <div className="col-md-6">
          <SelectableCard
            title="Join Team"
            description="Enter a team code and wait for approval."
            icon="🔑"
            selected={formData.teamChoice === "joinTeam"}
            onClick={() =>
              setFormData({ ...formData, teamChoice: "joinTeam" })
            }
          />
        </div>

        {formData.role === "swimmer" && (
          <div className="col-md-6">
            <SelectableCard
              title="Continue Independent"
              description="Use SwimSync without joining a team."
              icon="🌊"
              selected={formData.teamChoice === "independent"}
              onClick={() =>
                setFormData({ ...formData, teamChoice: "independent" })
              }
            />
          </div>
        )}
      </div>

      {formData.teamChoice === "createTeam" && (
        <div className="mt-4">
          <FormInput
            label="Team Name"
            name="teamName"
            value={formData.teamName}
            onChange={onChange}
            placeholder="Example: FAU Club Swim"
          />
        </div>
      )}

      {formData.teamChoice === "joinTeam" && (
        <div className="mt-4">
          <FormInput
            label="Team Join Code"
            name="joinCode"
            value={formData.joinCode}
            onChange={onChange}
            placeholder="Example: ABC123"
          />
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Back
        </button>

        <button
          className="btn btn-primary px-4"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Finish Setup"}
        </button>
      </div>
    </>
  );
}

export default TeamSetupStep;