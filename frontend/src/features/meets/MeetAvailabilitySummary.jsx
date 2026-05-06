import EmptyState from "../../components/ui/EmptyState";
import MeetAvailabilityRow from "./MeetAvailabilityRow";

function MeetAvailabilitySummary({ swimmers = [], requests = [] }) {
  if (swimmers.length === 0) {
    return <EmptyState message="No approved swimmers found for this team." />;
  }

  const availabilityRequests = requests.filter((request) => !request.event);

  const requestMap = {};

  availabilityRequests.forEach((request) => {
    requestMap[request.swimmerId] = request;
  });

  const attendingCount = availabilityRequests.filter(
    (request) => request.availability === "attending"
  ).length;

  const notAttendingCount = availabilityRequests.filter(
    (request) => request.availability === "not_attending"
  ).length;

  const unsureCount = availabilityRequests.filter(
    (request) => request.availability === "unsure"
  ).length;

  const noResponseCount = Math.max(
    swimmers.length - availabilityRequests.length,
    0
  );

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Swimmer Availability</h4>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="bg-light rounded-4 p-3 text-center">
              <h3 className="fw-bold text-primary mb-0">{attendingCount}</h3>
              <p className="text-muted mb-0">Attending</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="bg-light rounded-4 p-3 text-center">
              <h3 className="fw-bold text-primary mb-0">
                {notAttendingCount}
              </h3>
              <p className="text-muted mb-0">Not Attending</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="bg-light rounded-4 p-3 text-center">
              <h3 className="fw-bold text-primary mb-0">{unsureCount}</h3>
              <p className="text-muted mb-0">Unsure</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="bg-light rounded-4 p-3 text-center">
              <h3 className="fw-bold text-primary mb-0">{noResponseCount}</h3>
              <p className="text-muted mb-0">No Response</p>
            </div>
          </div>
        </div>

        {swimmers.map((swimmer) => (
          <MeetAvailabilityRow
            key={swimmer.id}
            swimmer={swimmer}
            request={requestMap[swimmer.userProfileId]}
          />
        ))}
      </div>
    </div>
  );
}

export default MeetAvailabilitySummary;