function FeatureCard({ icon, title, description }) {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow-sm border-0 rounded-4 hover-card text-center">
        <div className="card-body p-4 ">
          <div className="fs-2 mb-3 ">{icon}</div>
          <h4 className="card-title fw-bold text-primary">{title}</h4>
          <p className="card-text text-muted mb-0">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;