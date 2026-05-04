import RoleOptionCard from "../../components/ui/RoleOptionCard";
import SectionHeader from "../../components/ui/SectionHeader";

function RoleSelection({ selectedRole, onSelectRole }) {
  return (
    <>
      <SectionHeader
        title="Choose Your Role"
        subtitle="This helps SwimSync personalize your dashboard."
      />

      <div className="row g-4">
        <RoleOptionCard
          title="Coach"
          description="Create teams, post practices, track attendance, manage meets, and view swimmer progress."
          icon="🧑‍🏫"
          selected={selectedRole === "coach"}
          onClick={() => onSelectRole("coach")}
        />

        <RoleOptionCard
          title="Swimmer"
          description="View team practices, log training, request meet entries, and track personal performance."
          icon="🏊"
          selected={selectedRole === "swimmer"}
          onClick={() => onSelectRole("swimmer")}
        />
      </div>
    </>
  );
}

export default RoleSelection;