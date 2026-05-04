function TimeActions({ onEdit, onDelete }) {
  return (
    <div className="d-flex gap-2 mt-3">
      <button className="btn btn-outline-primary btn-sm" onClick={onEdit}>
        Edit
      </button>

      <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export default TimeActions;