import DashboardCard from "./DashboardCard";

function CoachDashboard() {
  return (
    <div className="row g-4 mt-3">
      <DashboardCard
        icon="📝"
        title="Create Practices"
        description="Write swim, lift, and dryland workouts for your team."
        to="/practices"
      />

      <DashboardCard
        icon="📋"
        title="Track Attendance"
        description="Monitor who attended practice and view team participation."
        to="/attendance"
      />

      <DashboardCard
        icon="🏆"
        title="Manage Meet"
        description="Upload meet files, review entries, and track race results."
        to="/meets"
      />

      <DashboardCard
        icon="🏊"
        title="TeamRoster"
        description="View roster, attendance, race times, and swimmer progress."
        to="/swimmers"
      />

      <DashboardCard
        icon="🏆"
        title="Manage Team"
        description="Manage your team members, their profiles, and team information."
        to="/team"
      />
    </div>
  );
}

export default CoachDashboard;