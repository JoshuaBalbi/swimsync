import TimeCard from "./TimeCard";
import EmptyState from "../../components/ui/EmptyState";

function TimeList({ times = [], canEdit = false, onEdit, onDelete }) {
  if (times.length === 0) {
    return <EmptyState message="No race times have been added yet." />;
  }

  return (
    <div>
      {times.map((race) => (
         <TimeCard
          key={race.id}
          race={race}
          canEdit={canEdit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TimeList;