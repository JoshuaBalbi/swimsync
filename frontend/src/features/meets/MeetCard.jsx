import BadgePill from "../../components/ui/BadgePill";

function MeetCard({ meet, onView }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 hover-card mb-3">
      <div className="card-body p-4 d-flex justify-content-between align-items-start">
        <div>
          <h4 className="fw-bold text-primary mb-1">{meet.name}</h4>
          <p className="text-muted mb-1">
            {meet.location || "No location"} • {meet.startDate}
            {meet.endDate ? ` - ${meet.endDate}` : ""}
          </p>

          <BadgePill variant="secondary">{meet.course}</BadgePill>
        </div>

        <button className="btn btn-outline-primary" onClick={() => onView(meet)}>
          View Meet
        </button>
      </div>
    </div>
  );
}

export default MeetCard;