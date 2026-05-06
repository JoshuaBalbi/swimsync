function FileInput({ label, name, onChange, accept }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        name={name}
        type="file"
        className="form-control"
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
}

export default FileInput;