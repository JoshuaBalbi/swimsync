import EmptyState from "../../components/ui/EmptyState";
import TeamMemberCard from "./TeamMemberCard";

function TeamMembersList({ members }) {
  if (!members || members.length === 0) {
    return <EmptyState message="No approved team members yet." />;
  }

  return (
    <div>
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

export default TeamMembersList;