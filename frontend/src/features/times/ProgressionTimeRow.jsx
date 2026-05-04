function ProgressionTimeRow({ race, index }) {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div>
        <p className="fw-bold mb-1">
          {index + 1}. {race.meetName || "Unattached Meet"}
        </p>
        <p className="text-muted mb-0">{race.raceDate}</p>
      </div>

      <div className="text-end">
        <h5 className="fw-bold text-primary mb-0">{race.time}</h5>
        <small className="text-muted">{race.course}</small>
      </div>
    </div>
  );
}

export default ProgressionTimeRow;