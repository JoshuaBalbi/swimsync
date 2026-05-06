import EmptyState from "../../components/ui/EmptyState";

function PendingRequests({ requests, onApprove, onReject }) {
  if (!requests || requests.length === 0) {
    return <EmptyState message="No pending join requests." />;
  }

  return (
    <div>
      {requests.map((request) => (
        <div className="card border-0 shadow-sm rounded-4 mb-3" key={request.id}>
          <div className="card-body p-4 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold text-primary mb-1">{request.userName}</h5>
              <p className="text-muted mb-0 text-capitalize">
                {request.role} request
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() => onApprove(request)}
              >
                Approve
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onReject(request)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;