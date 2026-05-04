export function parseTimeToSeconds(timeString) {
  if (!timeString) return 0;

  const parts = timeString.trim().split(":");

  if (parts.length === 1) {
    return Number(parts[0]);
  }

  if (parts.length === 2) {
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);
    return minutes * 60 + seconds;
  }

  return 0;
}

export function getPersonalBests(times) {
  const bestMap = {};

  times.forEach((race) => {
    const key = `${race.event}-${race.course}`;

    if (!bestMap[key] || race.timeInSeconds < bestMap[key].timeInSeconds) {
      bestMap[key] = race;
    }
  });

  return Object.values(bestMap);
}