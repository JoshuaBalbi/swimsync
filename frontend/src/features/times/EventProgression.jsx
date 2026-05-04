import { useState } from "react";
import FormSelect from "../../components/ui/FormSelect";
import StatCard from "../../components/ui/StatCard";
import EmptyState from "../../components/ui/EmptyState";
import ProgressionTimeRow from "./ProgressionTimeRow";
import LineChartCard from "../../components/ui/LineChartCard";

function EventProgression({ times = [] }) {
  const events = [...new Set(times.map((race) => race.event).filter(Boolean))];
  const courses = [...new Set(times.map((race) => race.course).filter(Boolean))];

  const [selectedEvent, setSelectedEvent] = useState(events[0] || "");
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || "");

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "event") {
      setSelectedEvent(value);
    }

    if (name === "course") {
      setSelectedCourse(value);
    }
  }

  const progressionTimes = times
    .filter(
      (race) =>
        race.event === selectedEvent &&
        race.course === selectedCourse
    )
    .sort((a, b) => new Date(a.raceDate) - new Date(b.raceDate));

    const chartData = progressionTimes.map((race, index) => ({
        attempt: index + 1,
        time: race.timeInSeconds,
        displayTime: race.time,
        meet: race.meetName,
        date: race.raceDate,
    }));

  if (times.length === 0) {
    return <EmptyState message="Add race times to view progression." />;
  }

  const fastestRace = progressionTimes.reduce((best, race) => {
    if (!best || race.timeInSeconds < best.timeInSeconds) return race;
    return best;
  }, null);

  const firstRace = progressionTimes[0];
  const latestRace = progressionTimes[progressionTimes.length - 1];

  const improvement =
    firstRace && fastestRace
      ? (firstRace.timeInSeconds - fastestRace.timeInSeconds).toFixed(2)
      : "0.00";

  return (
    <div>
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h3 className="fw-bold text-primary mb-3">Event Progression</h3>

          <div className="row g-3">
            <div className="col-md-6">
              <FormSelect
                label="Event"
                name="event"
                value={selectedEvent}
                onChange={handleChange}
                options={events.map((event) => ({
                  value: event,
                  label: event,
                }))}
              />
            </div>

            <div className="col-md-6">
              <FormSelect
                label="Course"
                name="course"
                value={selectedCourse}
                onChange={handleChange}
                options={courses.map((course) => ({
                  value: course,
                  label: course,
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {progressionTimes.length === 0 ? (
        <EmptyState message="No times found for this event and course." />
      ) : (
        <>
          <div className="row g-3 mb-4">
            <StatCard
              title="Fastest Time"
              value={fastestRace?.time}
              subtitle={fastestRace?.meetName || fastestRace?.raceDate}
            />

            <StatCard
              title="Most Recent"
              value={latestRace?.time}
              subtitle={latestRace?.raceDate}
            />

            <StatCard
              title="Total Improvement"
              value={`${improvement}s`}
              subtitle="From first recorded time to best time"
            />
          </div>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3">
                {selectedEvent} Progression ({selectedCourse})
              </h4>

              <LineChartCard
                title={`${selectedEvent} Progression Chart`}
                data={chartData}
                xKey="attempt"
                yKey="time"
                />

              {progressionTimes.map((race, index) => (
                <ProgressionTimeRow
                  key={race.id}
                  race={race}
                  index={index}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EventProgression;