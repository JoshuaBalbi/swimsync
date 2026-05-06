function ButtonGroup({ options, value, onChange }) {
  return (
    <div className="btn-group w-100">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`btn ${
            value === option.value
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;