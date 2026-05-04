import EmptyState from "../../components/ui/EmptyState";
import TeamMemberCard from "./TeamMemberCard";

function TeamMembersList({ members, onViewProgress }) {
  if (!members || members.length === 0) {
    return <EmptyState message="No approved team members yet." />;
  }

  return (
    <div>
      {members.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          onViewProgress={onViewProgress}
        />
      ))}
    </div>
  );
}

export default TeamMembersList;