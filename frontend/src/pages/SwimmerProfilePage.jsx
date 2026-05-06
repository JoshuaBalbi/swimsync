import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

import PageHeader from "../components/ui/PageHeader";
import BackButton from "../components/ui/BackButton";
import InfoCard from "../components/ui/InfoCard";

import SwimmerProfileHeader from "../features/swimmers/SwimmerProfileHeader";

import PersonalBestSummary from "../features/times/PersonalBestSummary";
import TimeList from "../features/times/TimeList";
import TimeFilters from "../features/times/TimeFilters";
import EventProgression from "../features/times/EventProgression";
import AttendanceHistoryList from "../features/attendance/AttendanceHistoryList";

function SwimmerProfilePage() {
  return (
    <Authenticator>
      {({ user }) => <SwimmerProfileContent user={user} />}
    </Authenticator>
  );
}

function SwimmerProfileContent({ user }) {
  const client = generateClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const [coachProfile, setCoachProfile] = useState(null);
  const [swimmerMembership, setSwimmerMembership] = useState(null);
  const [times, setTimes] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    event: "",
    meetName: "",
    course: "",
    sortBy: "recent",
  });

  useEffect(() => {
    loadSwimmerProfile();
  }, []);

  async function loadSwimmerProfile() {
    try {
      const profileResult = await client.models.UserProfile.list();

      if (profileResult.data.length === 0) {
        navigate("/onboarding");
        return;
      }

      const currentCoach = profileResult.data[0];

      if (currentCoach.role !== "coach") {
        alert("Only coaches can view swimmer profiles.");
        navigate("/dashboard");
        return;
      }

      setCoachProfile(currentCoach);

      const membershipResult = await client.models.TeamMembership.list({
        filter: {
          userProfileId: { eq: id },
        },
      });

      const approvedMembership = (membershipResult.data || []).find(
        (membership) =>
          membership.teamId === currentCoach.activeTeamId &&
          membership.status === "approved" &&
          membership.role === "swimmer"
      );

      if (!approvedMembership) {
        alert("This swimmer is not an approved member of your team.");
        navigate("/swimmers");
        return;
      }

      setSwimmerMembership(approvedMembership);

      const timesResult = await client.models.RaceTime.list({
        filter: {
          swimmerId: { eq: id },
        },
      });

      const sortedTimes = (timesResult.data || []).sort(
        (a, b) => new Date(b.raceDate) - new Date(a.raceDate)
      );

      setTimes(sortedTimes);

      const attendanceResult = await client.models.AttendanceRecord.list({
        filter: {
          swimmerId: { eq: id },
        },
      });

      setAttendanceRecords(attendanceResult.data || []);
    } catch (error) {
      console.error("Error loading swimmer profile:", error);
      alert("Could not load swimmer profile.");
    } finally {
      setLoading(false);
    }
  }

  const events = [...new Set(times.map((time) => time.event).filter(Boolean))];
  const meets = [...new Set(times.map((time) => time.meetName).filter(Boolean))];

  const filteredTimes = times
    .filter((race) => {
      return (
        (filters.event === "" || race.event === filters.event) &&
        (filters.meetName === "" || race.meetName === filters.meetName) &&
        (filters.course === "" || race.course === filters.course)
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "fastest") {
        return a.timeInSeconds - b.timeInSeconds;
      }

      if (filters.sortBy === "oldest") {
        return new Date(a.raceDate) - new Date(b.raceDate);
      }

      return new Date(b.raceDate) - new Date(a.raceDate);
    });

  const presentCount = attendanceRecords.filter(
    (record) => record.status === "present"
  ).length;

  const absentCount = attendanceRecords.filter(
    (record) => record.status === "absent"
  ).length;

  const excusedCount = attendanceRecords.filter(
    (record) => record.status === "excused"
  ).length;

  const totalMarked = attendanceRecords.filter((record) => record.status).length;

  const attendanceRate =
    totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0;

  const meetCount = new Set(
    times.map((race) => race.meetName).filter(Boolean)
  ).size;

  const eventCount = new Set(
    times.map((race) => race.event).filter(Boolean)
  ).size;

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <h4 className="text-muted">Loading swimmer profile...</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold">Swimmer Profile</span>
        <BackButton
          onClick={() => navigate("/swimmers")}
          label="Back to Swimmers"
        />
      </nav>

      <main className="container py-5">
        <PageHeader
          title="Swimmer Profile"
          subtitle={`Coach view • Logged in as ${user?.signInDetails?.loginId}`}
        />

        <SwimmerProfileHeader swimmer={swimmerMembership} />

        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "pbs" ? "active" : ""}`}
              onClick={() => setActiveTab("pbs")}
            >
              Personal Bests
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Time History
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "progression" ? "active" : ""
              }`}
              onClick={() => setActiveTab("progression")}
            >
              Event Progression
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "attendance" ? "active" : ""
              }`}
              onClick={() => setActiveTab("attendance")}
            >
              Attendance
            </button>
          </li>
        </ul>

        {activeTab === "overview" && (
          <div className="row g-3">
            <InfoCard
              title="Attendance Rate"
              value={`${attendanceRate}%`}
              subtitle={`${presentCount} present out of ${totalMarked} marked`}
            />

            <InfoCard
              title="Meets Logged"
              value={meetCount}
              subtitle="Unique meets in time history"
            />

            <InfoCard
              title="Events Logged"
              value={eventCount}
              subtitle="Unique events recorded"
            />

            <InfoCard
              title="Absent"
              value={absentCount}
              subtitle="Practices marked absent"
            />

            <InfoCard
              title="Excused"
              value={excusedCount}
              subtitle="Practices marked excused"
            />
          </div>
        )}

        {activeTab === "pbs" && <PersonalBestSummary times={times} />}

        {activeTab === "history" && (
          <>
            <TimeFilters
              filters={filters}
              setFilters={setFilters}
              events={events}
              meets={meets}
            />

            <h3 className="fw-bold mb-3">Time History</h3>

            <TimeList times={filteredTimes} canEdit={false} />
          </>
        )}

        {activeTab === "progression" && <EventProgression times={times} />}

        {activeTab === "attendance" && (
          <>
            <h3 className="fw-bold mb-3">Attendance History</h3>
            <AttendanceHistoryList records={attendanceRecords} />
          </>
        )}
      </main>
    </div>
  );
}

export default SwimmerProfilePage;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Authenticator } from "@aws-amplify/ui-react";
// import { generateClient } from "aws-amplify/data";

// import PageHeader from "../components/ui/PageHeader";
// import BackButton from "../components/ui/BackButton";
// import InfoCard from "../components/ui/InfoCard";

// import SwimmerProfileHeader from "../features/swimmers/SwimmerProfileHeader";

// import PersonalBestSummary from "../features/times/PersonalBestSummary";
// import TimeList from "../features/times/TimeList";
// import TimeFilters from "../features/times/TimeFilters";
// import EventProgression from "../features/times/EventProgression";
// import AttendanceHistoryList from "../features/attendance/AttendanceHistoryList";

// function SwimmerProfilePage() {
//   return (
//     <Authenticator>
//       {({ user }) => <SwimmerProfileContent user={user} />}
//     </Authenticator>
//   );
// }

// function SwimmerProfileContent({ user }) {
//   const client = generateClient();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [coachProfile, setCoachProfile] = useState(null);
//   const [swimmerMembership, setSwimmerMembership] = useState(null);
//   const [times, setTimes] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(true);

//   const [filters, setFilters] = useState({
//     event: "",
//     meetName: "",
//     course: "",
//     sortBy: "recent",
//   });

//   useEffect(() => {
//     loadSwimmerProfile();
//   }, []);

//   async function loadSwimmerProfile() {
//     try {
//       const profileResult = await client.models.UserProfile.list();

//       if (profileResult.data.length === 0) {
//         navigate("/onboarding");
//         return;
//       }

//       const currentCoach = profileResult.data[0];

//       if (currentCoach.role !== "coach") {
//         alert("Only coaches can view swimmer profiles.");
//         navigate("/dashboard");
//         return;
//       }

//       setCoachProfile(currentCoach);

//       const membershipResult = await client.models.TeamMembership.list({
//         filter: {
//           userProfileId: { eq: id },
//         },
//       });

//       const approvedMembership = (membershipResult.data || []).find(
//         (membership) =>
//           membership.teamId === currentCoach.activeTeamId &&
//           membership.status === "approved" &&
//           membership.role === "swimmer"
//       );

//       if (!approvedMembership) {
//         alert("This swimmer is not an approved member of your team.");
//         navigate("/swimmers");
//         return;
//       }

//       setSwimmerMembership(approvedMembership);

//       const timesResult = await client.models.RaceTime.list({
//         filter: {
//           swimmerId: { eq: id },
//         },
//       });

//       const sortedTimes = (timesResult.data || []).sort(
//         (a, b) => new Date(b.raceDate) - new Date(a.raceDate)
//       );

//       setTimes(sortedTimes);

//       const attendanceResult = await client.models.AttendanceRecord.list({
//         filter: {
//           swimmerId: { eq: id },
//         },
//       });

//       setAttendanceRecords(attendanceResult.data || []);
//     } catch (error) {
//       console.error("Error loading swimmer profile:", error);
//       alert("Could not load swimmer profile.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const events = [...new Set(times.map((time) => time.event).filter(Boolean))];
//   const meets = [...new Set(times.map((time) => time.meetName).filter(Boolean))];

//   const filteredTimes = times
//     .filter((race) => {
//       return (
//         (filters.event === "" || race.event === filters.event) &&
//         (filters.meetName === "" || race.meetName === filters.meetName) &&
//         (filters.course === "" || race.course === filters.course)
//       );
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "fastest") {
//         return a.timeInSeconds - b.timeInSeconds;
//       }

//       if (filters.sortBy === "oldest") {
//         return new Date(a.raceDate) - new Date(b.raceDate);
//       }

//       return new Date(b.raceDate) - new Date(a.raceDate);
//     });

//   const presentCount = attendanceRecords.filter(
//     (record) => record.status === "present"
//   ).length;

//   const totalMarked = attendanceRecords.filter((record) => record.status).length;

//   const attendanceRate =
//     totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0;

//   const meetCount = new Set(
//     times.map((race) => race.meetName).filter(Boolean)
//   ).size;

//   const eventCount = new Set(
//     times.map((race) => race.event).filter(Boolean)
//   ).size;

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center">
//         <h4 className="text-muted">Loading swimmer profile...</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 bg-light">
//       <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
//         <span className="navbar-brand fw-bold">Swimmer Profile</span>
//         <BackButton onClick={() => navigate("/swimmers")} label="Back to Swimmers" />
//       </nav>

//       <main className="container py-5">
//         <PageHeader
//           title="Swimmer Profile"
//           subtitle={`Coach view • Logged in as ${user?.signInDetails?.loginId}`}
//         />

//         <SwimmerProfileHeader swimmer={swimmerMembership} />

//         <ul className="nav nav-pills mb-4">
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
//               onClick={() => setActiveTab("overview")}
//             >
//               Overview
//             </button>
//           </li>

//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === "pbs" ? "active" : ""}`}
//               onClick={() => setActiveTab("pbs")}
//             >
//               Personal Bests
//             </button>
//           </li>

//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === "history" ? "active" : ""}`}
//               onClick={() => setActiveTab("history")}
//             >
//               Time History
//             </button>
//           </li>

//           <li className="nav-item">
//             <button
//               className={`nav-link ${
//                 activeTab === "progression" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("progression")}
//             >
//               Event Progression
//             </button>
//           </li>
//         </ul>

//         {activeTab === "overview" && (
//           <div className="row g-3">
//             <InfoCard
//               title="Attendance Rate"
//               value={`${attendanceRate}%`}
//               subtitle={`${presentCount} present out of ${totalMarked} marked`}
//             />

//             <InfoCard
//               title="Meets Logged"
//               value={meetCount}
//               subtitle="Unique meets in time history"
//             />

//             <InfoCard
//               title="Events Logged"
//               value={eventCount}
//               subtitle="Unique events recorded"
//             />
//           </div>
//         )}

//         {activeTab === "pbs" && <PersonalBestSummary times={times} />}

//         {activeTab === "history" && (
//           <>
//             <TimeFilters
//               filters={filters}
//               setFilters={setFilters}
//               events={events}
//               meets={meets}
//             />

//             <h3 className="fw-bold mb-3">Time History</h3>

//             <TimeList times={filteredTimes} canEdit={false} />
//           </>
//         )}

//         {activeTab === "progression" && <EventProgression times={times} />}
//       </main>
//     </div>
//   );
// }

// export default SwimmerProfilePage;