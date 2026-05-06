import EmptyState from "../../components/ui/EmptyState";
import MeetCard from "./MeetCard";

function MeetList({ meets = [], onView }) {
  if (meets.length === 0) {
    return <EmptyState message="No upcoming meets have been added yet." />;
  }

  return (
    <div>
      {meets.map((meet) => (
        <MeetCard key={meet.id} meet={meet} onView={onView} />
      ))}
    </div>
  );
}

export default MeetList;