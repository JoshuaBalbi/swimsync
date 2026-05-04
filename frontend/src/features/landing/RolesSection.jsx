import SectionHeader from "../../components/ui/SectionHeader";
import RoleCard from "./RoleCard";

function RolesSection() {
  return (
    <section className="container py-5">
      <SectionHeader
        title="Built for Coaches and Swimmers"
        subtitle="Each user gets tools based on their role."
      />

      <div className="row g-4">
        <RoleCard
          role="Coach"
          description="Manage team-level practices, attendance, meets, and athlete progress."
          items={[
            "Create and post team practices",
            "Use AI to generate workouts",
            "Track attendance",
            "Upload meet files",
            "Review swimmer progress",
          ]}
        />

        <RoleCard
          role="Swimmer"
          description="View team practices, log personal training, and track performance."
          items={[
            "View assigned practices",
            "Log swim, lift, and dryland sessions",
            "Request meet entries",
            "Upload race results",
            "Track personal bests",
          ]}
        />
      </div>
    </section>
  );
}

export default RolesSection;