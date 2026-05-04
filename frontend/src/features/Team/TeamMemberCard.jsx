function TeamMemberCard({ member, onViewProgress }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body p-4 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold text-primary mb-1">{member.userName}</h5>
          <p className="text-muted mb-0 text-capitalize">
            {member.role} • {member.membershipType}
          </p>
        </div>

        {member.role === "swimmer" && (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onViewProgress(member)}
          >
            View Progress
          </button>
        )}
      </div>
    </div>
  );
}

export default TeamMemberCard;