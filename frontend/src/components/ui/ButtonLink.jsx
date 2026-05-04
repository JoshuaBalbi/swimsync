import { Link } from "react-router-dom";

function ButtonLink({ to, children, variant = "primary", size = "" }) {
  return (
    <Link to={to} className={`btn btn-${variant} ${size}`}>
      {children}
    </Link>
  );
}

export default ButtonLink;