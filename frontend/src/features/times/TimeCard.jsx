import TimeActions from "./TimeActions";

function TimeCard({ race, canEdit = false, onEdit, onDelete }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 hover-card mb-3">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h4 className="fw-bold text-primary mb-1">{race.event}</h4>
            <p className="text-muted mb-0">
              {race.meetName || "Unattached Meet"} • {race.raceDate}
            </p>
          </div>

          <div className="text-end">
            <h3 className="fw-bold text-primary mb-0">{race.time}</h3>
            <small className="text-muted">{race.course}</small>
          </div>
        </div>

        <div className="mt-3">
          <p className="mb-1">
            <strong>Course:</strong> {race.course}
          </p>

          {race.notes && (
            <p className="text-muted mb-0">
              <strong>Notes:</strong> {race.notes}
            </p>
          )}
        </div>

        {canEdit && (
          <TimeActions
            onEdit={() => onEdit(race)}
            onDelete={() => onDelete(race)}
          />
        )}
      </div>
    </div>
  );
}

export default TimeCard;