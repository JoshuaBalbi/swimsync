import DashboardCard from "./DashboardCard";

function SwimmerDashboard() {
  return (
    <div className="row g-4 mt-3">
      <DashboardCard
        icon="🏊"
        title="View Practices"
        description="See practices assigned by your coach."
        to="/practices"
      />

      <DashboardCard
        icon="🏆"
        title="Meets"
        description="View upcoming meets, meet files, and submit availability."
        to="/meets"
      />

      <DashboardCard
        icon="⏱️"
        title="Track Times"
        description="Upload meet results and monitor personal best progression."
        to="/times"
      />
    </div>
  );
}

export default SwimmerDashboard;