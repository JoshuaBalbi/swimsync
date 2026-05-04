import PracticeActions from "./PracticeActions";

function PracticeCard({ practice, canEdit = false, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 hover-card mb-3">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h4 className="fw-bold text-primary mb-1">{practice.title}</h4>
            <p className="text-muted mb-0">{practice.date}</p>
          </div>

          <div className="d-flex gap-2">
            <span className="badge bg-primary-subtle text-primary">
              {practice.type}
            </span>

            <span className="badge bg-secondary-subtle text-secondary text-capitalize">
              {practice.visibility}
            </span>
          </div>
        </div>

        {practice.focus && (
          <p className="mb-1">
            <strong>Focus:</strong> {practice.focus}
          </p>
        )}

        {practice.totalAmount && (
          <p className="mb-1">
            <strong>Total:</strong> {practice.totalAmount}
          </p>
        )}

        {practice.mainSet && (
          <p className="mb-3">
            <strong>Main Set:</strong> {practice.mainSet}
          </p>
        )}

        <pre className="bg-light p-3 rounded-3 mb-3 text-wrap">
          {practice.workoutText}
        </pre>

        {practice.notes && (
          <p className="text-muted mb-0">
            <strong>Notes:</strong> {practice.notes}
          </p>
        )}

        {canEdit && (
          <PracticeActions
            onEdit={() => onEdit(practice)}
            onDelete={() => onDelete(practice)}
          />
        )}
      </div>
    </div>
  );
}

export default PracticeCard;