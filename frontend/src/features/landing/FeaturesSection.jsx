import SectionHeader from "../../components/ui/SectionHeader";
import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  return (
    <section className="container py-5">
      <SectionHeader
        title="What SwimSync Does"
        subtitle="A centralized platform for practices, attendance, meets, and performance tracking."
      />

      <div className="row g-4">
        <FeatureCard
          icon="🏊"
          title="Practice Management"
          description="Coaches can create swim, lift, and dryland workouts manually or with AI assistance."
        />

        <FeatureCard
          icon="📋"
          title="Attendance Tracking"
          description="Track swimmer attendance, workout completion, and personal training history."
        />

        <FeatureCard
          icon="⏱️"
          title="Meet & Time Tracking"
          description="Manage swim meets, entry requests, uploaded files, race results, and time progression."
        />
      </div>
    </section>
  );
}

export default FeaturesSection;