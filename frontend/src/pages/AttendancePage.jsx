import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import PracticeAttendanceSelector from "../features/attendance/PracticeAttendanceSelector";
import AttendanceRoster from "../features/attendance/AttendanceRoster";
import AttendanceSummary from "../features/attendance/AttendanceSummary";

function AttendancePage() {
  return (
    <Authenticator>
      {({ user }) => <AttendanceContent user={user} />}
    </Authenticator>
  );
}

function AttendanceContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [practices, setPractices] = useState([]);
  const [swimmers, setSwimmers] = useState([]);
  const [selectedPracticeId, setSelectedPracticeId] = useState("");
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selectedPractice = practices.find(
    (practice) => practice.id === selectedPracticeId
  );

  useEffect(() => {
    loadPageData();
  }, []);

  useEffect(() => {
    if (selectedPracticeId) {
      loadExistingAttendance(selectedPracticeId);
    }
  }, [selectedPracticeId]);

  async function loadPageData() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const userProfile = profileResult.data[0];

      if (userProfile.role !== "coach") {
        alert("Only coaches can access attendance.");
        navigate("/dashboard");
        return;
      }

      setProfile(userProfile);

      const practiceResult = await client.models.Practice.list({
        filter: {
          teamId: { eq: userProfile.activeTeamId },
        },
      });

      const sortedPractices = (practiceResult.data || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setPractices(sortedPractices);

      const membershipResult = await client.models.TeamMembership.list({
        filter: {
          teamId: { eq: userProfile.activeTeamId },
        },
      });

      const approvedSwimmers = (membershipResult.data || []).filter(
        (member) =>
          member.status === "approved" && member.role === "swimmer"
      );

      setSwimmers(approvedSwimmers);
    } catch (error) {
      console.error("Error loading attendance page:", error);
      alert("Could not load attendance page.");
    } finally {
      setLoading(false);
    }
  }

  async function loadExistingAttendance(practiceId) {
    try {
      const result = await client.models.AttendanceRecord.list({
        filter: {
          practiceId: { eq: practiceId },
        },
      });

      const newMap = {};

      (result.data || []).forEach((record) => {
        newMap[record.swimmerId] = record;
      });

      setAttendanceMap(newMap);
    } catch (error) {
      console.error("Error loading existing attendance:", error);
    }
  }

  function handleChangeAttendance(swimmer, updatedAttendance) {
    setAttendanceMap((current) => ({
      ...current,
      [swimmer.userProfileId]: {
        ...current[swimmer.userProfileId],
        ...updatedAttendance,
        swimmerId: swimmer.userProfileId,
        swimmerName: swimmer.userName,
      },
    }));
  }

  async function handleSaveAttendance() {
    if (!selectedPractice) {
      alert("Please select a practice first.");
      return;
    }

    try {
      setSaving(true);

      const recordsToSave = Object.values(attendanceMap).filter(
        (record) => record.status
      );

      for (const record of recordsToSave) {
        const attendanceData = {
          practiceId: selectedPractice.id,
          practiceTitle: selectedPractice.title,
          practiceDate: selectedPractice.date,
          teamId: selectedPractice.teamId,

          swimmerId: record.swimmerId,
          swimmerName: record.swimmerName,

          status: record.status,
          notes: record.notes || "",

          markedByCoachId: profile.id,
          markedByCoachName: `${profile.firstName} ${profile.lastName}`,
          dateMarked: new Date().toISOString(),
        };

        if (record.id) {
          await client.models.AttendanceRecord.update({
            id: record.id,
            ...attendanceData,
          });
        } else {
          await client.models.AttendanceRecord.create(attendanceData);
        }
      }

      alert("Attendance saved successfully.");
      await loadExistingAttendance(selectedPractice.id);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Could not save attendance.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading attendance...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">SwimSync Attendance</span>
        <BackButton
          onClick={() => navigate("/dashboard")}
          label="Back to Dashboard"
        />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Attendance"
          subtitle={`Logged in as ${user?.signInDetails?.loginId}`}
        />

        <PracticeAttendanceSelector
          practices={practices}
          selectedPracticeId={selectedPracticeId}
          onSelectPractice={setSelectedPracticeId}
        />

        {selectedPracticeId && (
        <>
            <AttendanceSummary attendanceMap={attendanceMap} />

            <AttendanceRoster
            swimmers={swimmers}
            attendanceMap={attendanceMap}
            onChangeAttendance={handleChangeAttendance}
            onSave={handleSaveAttendance}
            saving={saving}
            />
        </>
        )}
      </main>
    </div>
  );
}

export default AttendancePage;