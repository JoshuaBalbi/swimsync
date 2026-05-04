function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select
        name={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;