import ButtonLink from "../../components/ui/ButtonLink";

function CallToAction() {
  return (
    <section className="cta-section text-white text-center py-5">
      <div className="container">
        <h2 className="fw-bold">Ready to organize your swim team?</h2>
        <p className="lead">
          Start managing practices, attendance, meets, and swimmer progress in one place.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <ButtonLink to="/dashboard?mode=signup" variant="light" size="btn-lg">
            Sign Up
          </ButtonLink>

          <ButtonLink to="/dashboard?mode=signin" variant="outline-light" size="btn-lg">
            Login
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;