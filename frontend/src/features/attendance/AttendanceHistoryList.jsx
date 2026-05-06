import EmptyState from "../../components/ui/EmptyState";
import AttendanceHistoryCard from "./AttendanceHistoryCard";

function AttendanceHistoryList({ records = [] }) {
  if (records.length === 0) {
    return <EmptyState message="No attendance records found for this swimmer." />;
  }

  const sortedRecords = [...records].sort(
    (a, b) =>
      new Date(b.practiceDate || b.dateMarked) -
      new Date(a.practiceDate || a.dateMarked)
  );

  return (
    <div>
      {sortedRecords.map((record) => (
        <AttendanceHistoryCard key={record.id} record={record} />
      ))}
    </div>
  );
}

export default AttendanceHistoryList;