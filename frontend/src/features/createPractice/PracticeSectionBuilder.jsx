import SetBuilder from "./SetBuilder";

function PracticeSectionBuilder({ onChange }) {
  function handleSectionChange(section, sets) {
    onChange((prev) => ({
      ...prev,
      [section]: sets,
    }));
  }

  return (
    <div className="mt-4">
      <h4 className="fw-bold mb-3">Structured Practice Builder</h4>

      <div className="mb-4">
        <h5 className="fw-bold text-primary">Warmup</h5>
        <SetBuilder onChange={(sets) => handleSectionChange("warmup", sets)} />
      </div>

      <div className="mb-4">
        <h5 className="fw-bold text-primary">Pre-set</h5>
        <SetBuilder onChange={(sets) => handleSectionChange("preset", sets)} />
      </div>

      <div className="mb-4">
        <h5 className="fw-bold text-primary">Main Set</h5>
        <SetBuilder onChange={(sets) => handleSectionChange("mainSet", sets)} />
      </div>

      <div className="mb-4">
        <h5 className="fw-bold text-primary">Post-set</h5>
        <SetBuilder onChange={(sets) => handleSectionChange("postset", sets)} />
      </div>

      <div className="mb-4">
        <h5 className="fw-bold text-primary">Warmdown</h5>
        <SetBuilder onChange={(sets) => handleSectionChange("warmdown", sets)} />
      </div>
    </div>
  );
}

export default PracticeSectionBuilder;