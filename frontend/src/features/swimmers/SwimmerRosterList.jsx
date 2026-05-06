import EmptyState from "../../components/ui/EmptyState";
import SwimmerRosterCard from "./SwimmerRosterCard";

function SwimmerRosterList({ swimmers, onViewProfile }) {
  if (!swimmers || swimmers.length === 0) {
    return <EmptyState message="No approved swimmers found yet." />;
  }

  return (
    <div>
      {swimmers.map((swimmer) => (
        <SwimmerRosterCard
          key={swimmer.id}
          swimmer={swimmer}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
}

export default SwimmerRosterList;