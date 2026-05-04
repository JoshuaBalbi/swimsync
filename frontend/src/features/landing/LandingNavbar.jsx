import ButtonLink from "../../components/ui/ButtonLink";

function LandingNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-bold fs-4">SwimSync</span>

        <div className="d-flex gap-2">
          <ButtonLink to="/dashboard?mode=signin" variant="light">
            Login
          </ButtonLink>

          <ButtonLink to="/dashboard?mode=signup" variant="outline-light">
            Sign Up
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;