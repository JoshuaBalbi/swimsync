import StatusBadge from "../../components/ui/StatusBadge";

function AttendanceHistoryCard({ record }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 hover-card mb-3">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="fw-bold text-primary mb-1">
              {record.practiceTitle || "Untitled Practice"}
            </h5>

            <p className="text-muted mb-0">
              {record.practiceDate || record.dateMarked}
            </p>
          </div>

          <StatusBadge status={record.status} />
        </div>

        {record.notes && (
          <p className="text-muted mt-3 mb-0">
            <strong>Notes:</strong> {record.notes}
          </p>
        )}

        {record.markedByCoachName && (
          <p className="text-muted mt-2 mb-0">
            Marked by {record.markedByCoachName}
          </p>
        )}
      </div>
    </div>
  );
}

export default AttendanceHistoryCard;