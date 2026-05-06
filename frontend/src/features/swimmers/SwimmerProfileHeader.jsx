function SwimmerProfileHeader({ swimmer }) {
  if (!swimmer) return null;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h2 className="fw-bold text-primary mb-1">{swimmer.userName}</h2>
        <p className="text-muted mb-0">{swimmer.userEmail}</p>
      </div>
    </div>
  );
}

export default SwimmerProfileHeader;