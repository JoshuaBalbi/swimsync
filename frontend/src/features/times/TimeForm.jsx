import { useState } from "react";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import FormTextarea from "../../components/ui/FormTextArea";
import { parseTimeToSeconds } from "./timeUtils";

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
function TimeForm({ onAddTime, initialData = null, submitLabel = "Save Time" }) {

  const [formData, setFormData] = useState({
    meetName: initialData?.meetName || "",
    location: initialData?.location || "",
    raceDate: initialData?.raceDate || "",
    stroke: initialData?.stroke || "Free",
    distance: initialData?.distance?.toString() || "100",
    course: initialData?.course || "SCY",
    time: initialData?.time || "",
    notes: initialData?.notes || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "stroke" || name === "course") {
      const updatedForm = {
        ...formData,
        [name]: value,
      };

      const distanceOptions = getDistanceOptions(
        updatedForm.stroke,
        updatedForm.course
      );

      if (!distanceOptions.includes(updatedForm.distance)) {
        updatedForm.distance = distanceOptions[0];
      }

      setFormData(updatedForm);
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const timeInSeconds = parseTimeToSeconds(formData.time);

    if (!timeInSeconds) {
      alert("Please enter a valid time.");
      return;
    }

    const event = `${formData.distance} ${formData.stroke}`;

    onAddTime({
      ...formData,
      event,
      distance: Number(formData.distance),
      timeInSeconds,
    });

    setFormData({
      meetName: "",
      location: "",
      raceDate: "",
      stroke: "Free",
      distance: "100",
      course: "SCY",
      time: "",
      notes: "",
    });
  }

  const distanceOptions = getDistanceOptions(formData.stroke, formData.course);

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h3 className="fw-bold text-primary mb-3">Add Race Time</h3>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <FormInput label="Meet Name" name="meetName" value={formData.meetName} onChange={handleChange} placeholder="Meet Name" />
            </div>

            <div className="col-md-6">
              <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
            </div>

            <div className="col-md-4">
              <FormInput label="Race Date" name="raceDate" type="date" value={formData.raceDate} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <FormSelect
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                options={[
                  { value: "SCY", label: "SCY" },
                  { value: "SCM", label: "SCM" },
                  { value: "LCM", label: "LCM" },
                ]}
              />
            </div>

            <div className="col-md-4">
              <FormSelect
                label="Stroke"
                name="stroke"
                value={formData.stroke}
                onChange={handleChange}
                options={[
                  { value: "Free", label: "Free" },
                  { value: "Back", label: "Back" },
                  { value: "Breast", label: "Breast" },
                  { value: "Fly", label: "Fly" },
                  { value: "IM", label: "IM" },
                ]}
              />
            </div>

            <div className="col-md-6">
              <FormSelect
                label="Distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                options={distanceOptions.map((distance) => ({
                  value: distance,
                  label: distance,
                }))}
              />
            </div>

            <div className="col-md-6">
              <FormInput label="Time" name="time" value={formData.time} onChange={handleChange} placeholder="Time (e.g.: 48.72 or 1:48.72)" required />
            </div>

            <div className="col-12">
              <FormTextarea
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Round, placement, splits, race notes, etc."
              />
            </div>
          </div>

          <button className="btn btn-primary mt-4 px-4" type="submit">
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TimeForm;