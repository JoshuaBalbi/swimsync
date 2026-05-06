function PracticeFilters({ filters, setFilters }) {
  function handleChange(e) {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3">Filter Practices</h5>

        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option>Swim</option>
              <option>Lift</option>
              <option>Dryland</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Focus</label>
            <select
              name="focus"
              className="form-select"
              value={filters.focus}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option>Sprint</option>
              <option>Distance</option>
              <option>IM</option>
              <option>Recovery</option>
              <option>Strength</option>
              <option>Technique</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Team Scope</label>
            <select
                name="teamScope"
                className="form-select"
                value={filters.teamScope}
                onChange={handleChange}
            >
                <option value="">All</option>
                <option value="your">Your Team</option>
                <option value="other">Other Teams</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Practice Date</label>
            <select
              name="practiceTime"
              className="form-select"
              value={filters.practiceTime}
              onChange={handleChange}
            >
              <option value="">All Practices</option>
              <option value="upcoming">Upcoming / Today</option>
              <option value="past">Past Practices</option>
            </select>
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() =>
                setFilters({ type: "", focus: "", teamScope: "", practiceTime: "" })
              }
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeFilters;