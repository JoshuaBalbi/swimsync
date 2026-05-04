function TimeFilters({ filters, setFilters, events = [], meets = [] }) {
  function handleChange(e) {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  }

  function resetFilters() {
    setFilters({
      event: "",
      meetName: "",
      course: "",
      sortBy: "recent",
    });
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3">Filter Times</h5>

        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Event</label>
            <select
              name="event"
              className="form-select"
              value={filters.event}
              onChange={handleChange}
            >
              <option value="">All Events</option>
              {events.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Course</label>
            <select
              name="course"
              className="form-select"
              value={filters.course}
              onChange={handleChange}
            >
              <option value="">All Courses</option>
              <option value="SCY">SCY</option>
              <option value="SCM">SCM</option>
              <option value="LCM">LCM</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Meet</label>
            <select
              name="meetName"
              className="form-select"
              value={filters.meetName}
              onChange={handleChange}
            >
              <option value="">All Meets</option>
              {meets.map((meet) => (
                <option key={meet} value={meet}>
                  {meet}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Sort By</label>
            <select
              name="sortBy"
              className="form-select"
              value={filters.sortBy}
              onChange={handleChange}
            >
              <option value="recent">Most Recent</option>
              <option value="fastest">Fastest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <div className="col-12">
            <button className="btn btn-outline-secondary" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeFilters;