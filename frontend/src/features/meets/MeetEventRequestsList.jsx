import { useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import BadgePill from "../../components/ui/BadgePill";

function MeetEventRequestsList({ requests = [] }) {
  const eventRequests = requests.filter((request) => request.event);
  const [openSwimmerId, setOpenSwimmerId] = useState("");

  if (eventRequests.length === 0) {
    return <EmptyState message="No event requests have been submitted yet." />;
  }

  const groupedRequests = eventRequests.reduce((groups, request) => {
    if (!groups[request.swimmerId]) {
      groups[request.swimmerId] = {
        swimmerId: request.swimmerId,
        swimmerName: request.swimmerName,
        requests: [],
      };
    }

    groups[request.swimmerId].requests.push(request);
    return groups;
  }, {});

  const swimmers = Object.values(groupedRequests);

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Event Requests</h4>

        {swimmers.map((swimmer) => {
          const isOpen = openSwimmerId === swimmer.swimmerId;

          return (
            <div key={swimmer.swimmerId} className="border-bottom py-3">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none w-100 text-start"
                onClick={() =>
                  setOpenSwimmerId(isOpen ? "" : swimmer.swimmerId)
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold text-primary mb-1">
                      {swimmer.swimmerName}
                    </h5>
                    <p className="text-muted mb-0">
                      {swimmer.requests.length} requested event
                      {swimmer.requests.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <span className="text-primary fw-bold">
                    {isOpen ? "Hide" : "View"}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 ps-3">
                  {swimmer.requests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-light rounded-4 p-3 mb-2"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold mb-1">{request.event}</h6>

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

                        <BadgePill variant="secondary">
                          {request.status}
                        </BadgePill>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeetEventRequestsList;