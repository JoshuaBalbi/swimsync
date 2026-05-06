import AttendanceSummaryCard from "./AttendanceSummaryCard";

function AttendanceSummary({ attendanceMap }) {
  const records = Object.values(attendanceMap || {}).filter(
    (record) => record.status
  );

  const presentCount = records.filter(
    (record) => record.status === "present"
  ).length;

  const absentCount = records.filter(
    (record) => record.status === "absent"
  ).length;

  const excusedCount = records.filter(
    (record) => record.status === "excused"
  ).length;

  const totalMarked = records.length;

  const attendanceRate =
    totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0;

  if (totalMarked === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="fw-bold mb-3">Attendance Summary</h3>

      <div className="row g-3">
        <AttendanceSummaryCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          subtitle={`${presentCount} present out of ${totalMarked} marked`}
        />

        <AttendanceSummaryCard
          title="Absent"
          value={absentCount}
          subtitle="Marked absent"
        />

        <AttendanceSummaryCard
          title="Excused"
          value={excusedCount}
          subtitle="Marked excused"
        />
      </div>
    </div>
  );
}

export default AttendanceSummary;