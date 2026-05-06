import EmptyState from "../../components/ui/EmptyState";
import AttendanceRow from "./AttendanceRow";
import PrimaryButton from "../../components/ui/PrimaryButton";

function AttendanceRoster({ swimmers, attendanceMap, onChangeAttendance, onSave, saving }) {
  if (!swimmers || swimmers.length === 0) {
    return <EmptyState message="No approved swimmers found for this team." />;
  }

  return (
    <div>
      <h3 className="fw-bold mb-3">Mark Attendance</h3>

      {swimmers.map((swimmer) => (
        <AttendanceRow
          key={swimmer.id}
          swimmer={swimmer}
          attendance={attendanceMap[swimmer.userProfileId]}
          onChange={onChangeAttendance}
        />
      ))}

        <PrimaryButton onClick={onSave} disabled={saving}>
            {saving ? "Saving..." : "Save Attendance"}
        </PrimaryButton>
    </div>
  );
}

export default AttendanceRoster;