import PracticeCard from "./PracticeCard";
import EmptyState from "../../components/ui/EmptyState";

function PracticeList({ practices = [], canEdit = false, onEdit, onDelete }) {
  const safePractices = practices.filter(Boolean);

  if (safePractices.length === 0) {
    return <EmptyState message="No practices have been created yet." />;
  }

  return (
    <div>
      {safePractices.map((practice) => (
        <PracticeCard
          key={practice.id}
          practice={practice}
          canEdit={canEdit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PracticeList;