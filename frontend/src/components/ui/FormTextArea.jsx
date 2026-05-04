function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 3,
  required = false,
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <textarea
        name={name}
        className="form-control"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </div>
  );
}

export default FormTextarea;