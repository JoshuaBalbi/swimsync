import StatCard from "../../components/ui/StatCard";
import { getPersonalBests } from "./timeUtils";

function PersonalBestSummary({ times = [] }) {
  const personalBests = getPersonalBests(times);

  if (personalBests.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="fw-bold mb-3">Personal Bests</h3>

      <div className="row g-3">
        {personalBests.map((race) => (
          <StatCard
            key={`${race.event}-${race.course}`}
            title={`${race.event} (${race.course})`}
            value={race.time}
            subtitle={race.meetName || race.raceDate}
          />
        ))}
      </div>
    </div>
  );
}

export default PersonalBestSummary;