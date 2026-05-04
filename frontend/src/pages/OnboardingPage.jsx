import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";

import PersonalInfoStep from "../features/onboarding/PersonalInfoStep";
import RoleStep from "../features/onboarding/RoleStep";
import TeamSetupStep from "../features/onboarding/TeamSetupStep";

function OnboardingPage() {
  return (
    <Authenticator>
      {() => <OnboardingContent />}
    </Authenticator>
  );
}

function OnboardingContent() {
  const navigate = useNavigate();
  const client = generateClient();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    role: "",
    teamChoice: "",
    teamName: "",
    joinCode: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function nextStep() {
    if (step === 1 && (!formData.firstName || !formData.lastName)) {
      alert("Please enter your first and last name.");
      return;
    }

    if (step === 2 && !formData.role) {
      alert("Please select a role.");
      return;
    }

    setStep(step + 1);
  }

  function previousStep() {
    setStep(step - 1);
  }

  function generateJoinCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async function handleSubmit() {
    if (!formData.teamChoice) {
      alert("Please select a team option.");
      return;
    }

    if (formData.teamChoice === "createTeam" && !formData.teamName) {
      alert("Please enter a team name.");
      return;
    }

    if (formData.teamChoice === "joinTeam" && !formData.joinCode) {
      alert("Please enter a team join code.");
      return;
    }

    try {
      setLoading(true);

      const currentUser = await getCurrentUser();
      const email = currentUser.signInDetails?.loginId;
      const fullName = `${formData.firstName} ${formData.lastName}`;

      const profileResult = await client.models.UserProfile.create({
        cognitoUserId: currentUser.userId,
        email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        role: formData.role,
        activeTeamId: null,
        onboardingComplete: true,
      });

      const profile = profileResult.data;

      if (!profile) {
        console.error("Profile creation failed:", profileResult);
        alert("Profile could not be created.");
        return;
      }

      if (formData.teamChoice === "createTeam") {
        const teamResult = await client.models.Team.create({
          name: formData.teamName,
          joinCode: generateJoinCode(),
          createdByUserId: profile.id,
          headCoachName: fullName,
        });

        const team = teamResult.data;

        if (!team) {
          console.error("Team creation failed:", teamResult);
          alert("Team could not be created.");
          return;
        }

        await client.models.TeamMembership.create({
          teamId: team.id,
          userProfileId: profile.id,
          userEmail: email,
          userName: fullName,
          role: formData.role,
          status: "approved",
          membershipType: "headCoach",
        });

        await client.models.UserProfile.update({
          id: profile.id,
          activeTeamId: team.id,
        });
      }

      if (formData.teamChoice === "joinTeam") {
        const teamsResult = await client.models.Team.list({
          filter: {
            joinCode: {
              eq: formData.joinCode.toUpperCase(),
            },
          },
        });

        const team = teamsResult.data[0];

        if (!team) {
          alert("No team found with that join code.");
          return;
        }

        await client.models.TeamMembership.create({
          teamId: team.id,
          userProfileId: profile.id,
          userEmail: email,
          userName: fullName,
          role: formData.role,
          status: "pending",
          membershipType:
            formData.role === "coach" ? "assistantCoach" : "swimmer",
        });

        await client.models.UserProfile.update({
          id: profile.id,
          activeTeamId: team.id,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      alert("Something went wrong during onboarding. Check the console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary">Complete Your Profile</h2>
              <p className="text-muted mb-0">
                Step {step} of 3 — Set up your SwimSync account.
              </p>
            </div>

            {step === 1 && (
              <PersonalInfoStep
                formData={formData}
                onChange={handleChange}
                onNext={nextStep}
              />
            )}

            {step === 2 && (
              <RoleStep
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onBack={previousStep}
              />
            )}

            {step === 3 && (
              <TeamSetupStep
                formData={formData}
                setFormData={setFormData}
                onChange={handleChange}
                onBack={previousStep}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Authenticator } from "@aws-amplify/ui-react";
// import { getCurrentUser } from "aws-amplify/auth";
// import { generateClient } from "aws-amplify/data";
// import RoleSelection from "../features/onboarding/RoleSelection";

// function OnboardingPage() {
//   return (
//     <Authenticator>
//       {() => <OnboardingContent />}
//     </Authenticator>
//   );
// }

// function OnboardingContent() {
//   const navigate = useNavigate();
//   const client = generateClient();

//   const [selectedRole, setSelectedRole] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleContinue() {
//     if (!selectedRole) {
//       alert("Please select a role.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const currentUser = await getCurrentUser();

//       await client.models.UserProfile.create({
//         cognitoUserId: currentUser.userId,
//         email: currentUser.signInDetails?.loginId,
//         name: currentUser.username,
//         role: selectedRole.toLowerCase(),
//       });

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error saving profile:", error);
//       alert("Something went wrong saving your profile.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-vh-100 bg-light d-flex align-items-center">
//       <div className="container py-5">
//         <RoleSelection
//           selectedRole={selectedRole}
//           onSelectRole={setSelectedRole}
//         />

//         <div className="text-center mt-4">
//           <button
//             className="btn btn-primary btn-lg px-5"
//             onClick={handleContinue}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Continue"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OnboardingPage;