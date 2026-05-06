function TeamMemberCard({ member }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body p-4">
        <h5 className="fw-bold text-primary mb-1">{member.userName}</h5>
        <p className="text-muted mb-0 text-capitalize">
          {member.role} • {member.membershipType}
        </p>
      </div>
    </div>
  );
}

export default TeamMemberCard;