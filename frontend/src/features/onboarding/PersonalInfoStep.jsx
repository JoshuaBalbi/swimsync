import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";

function PersonalInfoStep({ formData, onChange, onNext }) {
  return (
    <>
      <h4 className="fw-bold mb-3">Personal Information</h4>

      <div className="row g-3">
        <div className="col-md-6">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={onChange}
          />
        </div>

        <div className="col-md-6">
          <FormSelect
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={onChange}
            options={[
              { value: "", label: "Select gender" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ]}
          />
        </div>
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-primary px-4" onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default PersonalInfoStep;