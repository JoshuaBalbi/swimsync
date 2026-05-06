function AttendanceSummaryCard({ title, value, subtitle }) {
  return (
    <div className="col-md-4">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <div className="card-body p-4">
          <p className="text-muted mb-1">{title}</p>
          <h3 className="fw-bold text-primary mb-1">{value}</h3>
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export default AttendanceSummaryCard;