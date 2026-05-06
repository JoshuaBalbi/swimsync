import EmptyState from "../../components/ui/EmptyState";
import BadgePill from "../../components/ui/BadgePill";

function MyMeetEventRequests({ requests = [] }) {
  const eventRequests = requests.filter((request) => request.event);

  if (eventRequests.length === 0) {
    return <EmptyState message="You have not requested any events yet." />;
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">My Requested Events</h4>

        {eventRequests.map((request) => (
          <div
            key={request.id}
            className="d-flex justify-content-between align-items-start border-bottom py-3"
          >
            <div>
              <h5 className="fw-bold text-primary mb-1">{request.event}</h5>
              <p className="mb-1">
                <strong>Best Time:</strong>{" "}
                {request.bestTime || "No time found"}
              </p>

              {request.notes && (
                <p className="text-muted mb-0">
                  <strong>Notes:</strong> {request.notes}
                </p>
              )}
            </div>

            <BadgePill variant="secondary">{request.status}</BadgePill>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyMeetEventRequests;