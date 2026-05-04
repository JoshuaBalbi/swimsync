import LandingNavbar from "../features/landing/LandingNavbar";
import HeroSection from "../features/landing/HeroSection";
import FeaturesSection from "../features/landing/FeaturesSection";
import RolesSection from "../features/landing/RolesSection";
import CallToAction from "../features/landing/CallToAction";
import HowItWorksSection from "../features/landing/HowItWorksSection";

function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <RolesSection />
      <CallToAction />
    </>
  );
}

export default LandingPage;