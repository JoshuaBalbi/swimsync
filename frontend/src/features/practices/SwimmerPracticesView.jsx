import PracticeList from "./PracticeList";

function SwimmerPracticesView({ practices }) {
  return (
    <>
      <div className="alert alert-info rounded-4">
        View practices posted by your team or public practices shared by coaches.
      </div>

      <h3 className="fw-bold mb-3">Available Practices</h3>
      <PracticeList practices={practices} />
    </>
  );
}

export default SwimmerPracticesView;