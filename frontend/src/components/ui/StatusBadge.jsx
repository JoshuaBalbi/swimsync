function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase();

  const badgeClass =
    normalizedStatus === "present"
      ? "bg-success-subtle text-success"
      : normalizedStatus === "absent"
      ? "bg-danger-subtle text-danger"
      : normalizedStatus === "excused"
      ? "bg-warning-subtle text-warning"
      : "bg-secondary-subtle text-secondary";

  return (
    <span className={`badge rounded-pill text-capitalize ${badgeClass}`}>
      {status || "Unknown"}
    </span>
  );
}

export default StatusBadge;