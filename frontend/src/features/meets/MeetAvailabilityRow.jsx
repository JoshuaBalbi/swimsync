import StatusBadge from "../../components/ui/StatusBadge";

function MeetAvailabilityRow({ swimmer, request }) {
  const status = request?.availability || "no_response";

  const displayStatus =
    status === "attending"
      ? "Attending"
      : status === "not_attending"
      ? "Not Attending"
      : status === "unsure"
      ? "Unsure"
      : "No Response";

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div>
        <h6 className="fw-bold text-primary mb-1">{swimmer.userName}</h6>
        <p className="text-muted mb-0 text-capitalize">{swimmer.role}</p>
      </div>

      <StatusBadge status={displayStatus} />
    </div>
  );
}

export default MeetAvailabilityRow;