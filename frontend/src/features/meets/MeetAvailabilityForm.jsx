import { useState } from "react";
import FormTextarea from "../../components/ui/FormTextarea";

function MeetAvailabilityForm({ existingRequest, onSubmit }) {
  const [availability, setAvailability] = useState(
    existingRequest?.availability || "unsure"
  );
  const [notes, setNotes] = useState(existingRequest?.notes || "");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      availability,
      notes,
    });
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Meet Availability</h4>

        <form onSubmit={handleSubmit}>
          <div className="btn-group w-100 mb-3">
            {[
              { value: "attending", label: "Attending" },
              { value: "not_attending", label: "Not Attending" },
              { value: "unsure", label: "Unsure" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                className={`btn ${
                  availability === option.value
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setAvailability(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <FormTextarea
            label="Notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Travel conflicts, relay preferences, event notes, etc."
          />

          <button className="btn btn-primary mt-3 px-4">
            Save Availability
          </button>
        </form>
      </div>
    </div>
  );
}

export default MeetAvailabilityForm;