function SelectableCard({ title, description, icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`card w-100 h-100 text-start rounded-4 shadow-sm hover-card ${
        selected
          ? "bg-primary-subtle border border-primary border-3"
          : "border-0 bg-white"
      }`}
    >
      <div className="card-body p-4 position-relative">
        {selected && (
          <span className="position-absolute top-0 end-0 m-3 badge rounded-pill bg-primary">
            ✓
          </span>
        )}

        {icon && <div className="fs-1 mb-2">{icon}</div>}

        <h4 className="fw-bold text-primary">{title}</h4>
        <p className="text-muted mb-0">{description}</p>
      </div>
    </button>
  );
}

export default SelectableCard;