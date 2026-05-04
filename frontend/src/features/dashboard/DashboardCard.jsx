import { useNavigate } from "react-router-dom";

function DashboardCard({ title, description, icon, to }) {
  const navigate = useNavigate();

  return (
    <div className="col-md-4">
      <div
        className="card h-100 shadow-sm border-0 rounded-4 hover-card"
        role="button"
        onClick={() => navigate(to)}
      >
        <div className="card-body p-4">
          <div className="fs-2 mb-3">{icon}</div>
          <h4 className="fw-bold text-primary">{title}</h4>
          <p className="text-muted mb-0">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;