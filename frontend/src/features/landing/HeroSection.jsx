import ButtonLink from "../../components/ui/ButtonLink";

function HeroSection() {
  return (
    <section className="hero-section border-bottom">
      <div className="container text-center py-5">
        <h1 className="display-3 fw-bold text-primary mb-3">
          Cloud-Based Swim Team Management
        </h1>

        <p className="lead text-muted mx-auto" style={{ maxWidth: "850px" }}>
          SwimSync helps coaches create practices, manage teams, track attendance,
          organize meets, and helps swimmers log training, lifts, dryland, and race
          results in one centralized platform.
        </p>

        <div className="mt-4 d-flex justify-content-center gap-3">
          <ButtonLink to="/dashboard?mode=signup" variant="primary" size="btn-lg px-4">
            Get Started
          </ButtonLink>

          <ButtonLink to="/dashboard?mode=signin" variant="outline-primary" size="btn-lg px-4">
            Login
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;