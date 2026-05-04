function RoleCard({ role, description, items }) {
  return (
    <div className="col-md-6">
      <div className="card h-100 shadow-sm border-0 hover-card">
        <div className="card-body">
          <h3 className="fw-bold text-primary">{role}</h3>
          <p className="text-muted">{description}</p>

          <ul className="list-group list-group-flush">
            {items.map((item) => (
              <li key={item} className="list-group-item px-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoleCard;