function SwimmerRosterCard({ swimmer, onViewProfile }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 hover-card mb-3">
      <div className="card-body p-4 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold text-primary mb-1">{swimmer.userName}</h5>
          <p className="text-muted mb-0">
            {swimmer.userEmail}
          </p>
        </div>

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => onViewProfile(swimmer)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default SwimmerRosterCard;