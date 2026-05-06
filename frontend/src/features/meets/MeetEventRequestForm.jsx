import { useState } from "react";
import FormSelect from "../../components/ui/FormSelect";
import FormTextarea from "../../components/ui/FormTextarea";

const strokeOptions = ["Free", "Back", "Breast", "Fly", "IM"];

function getDistanceOptions(stroke, course) {
  if (stroke === "Free") {
    return course === "SCY"
      ? ["50", "100", "200", "500", "1000", "1650"]
      : ["50", "100", "200", "400", "800", "1500"];
  }

  if (stroke === "IM") {
    return course === "LCM" ? ["200", "400"] : ["100", "200", "400"];
  }

  return ["50", "100", "200"];
}

function findBestTime(times, event, course) {
  const matchingTimes = times.filter(
    (race) => race.event === event && race.course === course
  );

  if (matchingTimes.length === 0) return null;

  return matchingTimes.reduce((best, race) =>
    race.timeInSeconds < best.timeInSeconds ? race : best
  );
}

function MeetEventRequestForm({ meet, swimmerTimes = [], onSubmit }) {
  const [stroke, setStroke] = useState("Free");
  const [distance, setDistance] = useState("100");
  const [notes, setNotes] = useState("");

  const distanceOptions = getDistanceOptions(stroke, meet.course);

  function handleStrokeChange(e) {
    const newStroke = e.target.value;
    const newDistances = getDistanceOptions(newStroke, meet.course);

    setStroke(newStroke);

    if (!newDistances.includes(distance)) {
      setDistance(newDistances[0]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const event = `${distance} ${stroke}`;
    const bestRace = findBestTime(swimmerTimes, event, meet.course);

    onSubmit({
      event,
      bestTime: bestRace?.time || "No time found",
      bestTimeRaceId: bestRace?.id || null,
      notes,
    });

    setStroke("Free");
    setDistance("100");
    setNotes("");
  }

  const selectedEvent = `${distance} ${stroke}`;
  const bestRace = findBestTime(swimmerTimes, selectedEvent, meet.course);

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Request Events</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <FormSelect
                label="Stroke"
                name="stroke"
                value={stroke}
                onChange={handleStrokeChange}
                options={strokeOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            </div>

            <div className="col-md-4">
              <FormSelect
                label="Distance"
                name="distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                options={distanceOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Best {meet.course} Time</label>
              <div className="form-control bg-light">
                {bestRace ? bestRace.time : "No time found"}
              </div>
            </div>

            <div className="col-12">
              <FormTextarea
                label="Event Notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any event preferences, relay notes, or concerns..."
              />
            </div>
          </div>

          <button className="btn btn-primary mt-4 px-4" type="submit">
            Request {selectedEvent}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MeetEventRequestForm;