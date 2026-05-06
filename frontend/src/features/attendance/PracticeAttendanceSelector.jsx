function PracticeAttendanceSelector({ practices, selectedPracticeId, onSelectPractice }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Select Practice</h4>

        <select
          className="form-select"
          value={selectedPracticeId}
          onChange={(e) => onSelectPractice(e.target.value)}
        >
          <option value="">Choose a practice</option>

          {practices.map((practice) => (
            <option key={practice.id} value={practice.id}>
              {practice.date} — {practice.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PracticeAttendanceSelector;