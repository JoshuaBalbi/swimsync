import { useState } from "react";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import FormTextarea from "../../components/ui/FormTextArea";

function MeetForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    course: "SCY",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <h3 className="fw-bold text-primary mb-3">Meet Information</h3>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <FormInput
                label="Meet Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="FAU Invite"
                required
              />
            </div>

            <div className="col-md-6">
              <FormInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Boca Raton, FL"
              />
            </div>

            <div className="col-md-4">
              <FormInput
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <FormInput
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
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

            <div className="col-12">
              <FormTextarea
                label="Meet Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Important meet details, travel info, deadlines, etc."
              />
            </div>
          </div>

          <button className="btn btn-primary mt-4 px-4" disabled={loading}>
            {loading ? "Creating..." : "Create Meet"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MeetForm;