import PracticeForm from "./PracticeForm";
import PracticeList from "./PracticeList";

function CoachPracticesView({ practices, onCreatePractice }) {
  return (
    <>
      <PracticeForm onCreatePractice={onCreatePractice} />

      <h3 className="fw-bold mb-3">Your Posted Practices</h3>
      <PracticeList practices={practices} />
    </>
  );
}

export default CoachPracticesView;