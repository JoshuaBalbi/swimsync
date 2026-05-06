function TeamInfoCard({ team }) {
    if (!team) return null;

    return (
        <div className="card boarder-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
                <h3 className="fw-bold text-primary mb-2">{team.name}</h3>

                <p className = "text-muted mb-2">
                    Head Coach: {team.headCoach ||  "N/A"}
                </p>

                <div className="bg-light p-3 rounded-4 p-3">
                    <p className="text-muted mb-1">Team Join</p> 
                    <h2 className = "fw-bold text-primary mb-0">{team.joinCode || "N/A"}</h2>
                </div>

                <p className="text-muted mt-3 mb-0">
                    Swimmers and assistant coaches can use this code to request access
                    to the team. You can manage team access in the Team Settings page.
                </p>
            </div>
        </div>
    );
}   


export default TeamInfoCard;