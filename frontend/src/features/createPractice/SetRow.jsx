function SetRow({ set, onChange, onRemove }) {
  function handleChange(e) {
    const { name, value } = e.target;
    onChange({ ...set, [name]: value });
  }

  return (
    <div className="card p-3 mb-2 shadow-sm border-0">
      <div className="row g-2 align-items-end">
        <div className="col-md-2">
          <label className="form-label">Reps</label>
          <input
            name="reps"
            className="form-control"
            value={set.reps}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Distance</label>
          <input
            name="distance"
            className="form-control"
            value={set.distance}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Stroke</label>
          <select
            name="stroke"
            className="form-select"
            value={set.stroke}
            onChange={handleChange}
          >
            <option>Free</option>
            <option>Back</option>
            <option>Breast</option>
            <option>Fly</option>
            <option>IM</option>
            <option>Kick</option>
            <option>Pull</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label">Interval</label>
          <input
            name="interval"
            className="form-control"
            placeholder="1:20"
            value={set.interval}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Notes</label>
          <input
            name="notes"
            className="form-control"
            value={set.notes}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-1 text-end">
          <button
            className="btn btn-outline-danger"
            onClick={onRemove}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetRow;