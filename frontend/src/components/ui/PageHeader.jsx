function PageHeader({ title, subtitle, action }) {
  return (
    <div className="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h1 className="fw-bold text-primary mb-1">{title}</h1>
        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default PageHeader;