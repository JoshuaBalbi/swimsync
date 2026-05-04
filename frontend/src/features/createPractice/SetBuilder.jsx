import { useState } from "react";
import SetRow from "./SetRow";

function SetBuilder({ onChange }) {
  const [sets, setSets] = useState([]);

  function addSet() {
    const newSets = [
      ...sets,
      { reps: "", distance: "", stroke: "Free", interval: "", notes: "" },
    ];
    setSets(newSets);
    onChange(newSets);
  }

  function updateSet(index, updated) {
    const newSets = [...sets];
    newSets[index] = updated;
    setSets(newSets);
    onChange(newSets);
  }

  function removeSet(index) {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
    onChange(newSets);
  }

  return (
    <div>
      {sets.map((set, index) => (
        <SetRow
          key={index}
          set={set}
          onChange={(updated) => updateSet(index, updated)}
          onRemove={() => removeSet(index)}
        />
      ))}

      <button className="btn btn-outline-primary mt-2" onClick={addSet}>
        + Add Set
      </button>
    </div>
  );
}

export default SetBuilder;