function BadgePill({ children, variant = "primary" }) {
  return (
    <span className={`badge bg-${variant}-subtle text-${variant} rounded-pill`}>
      {children}
    </span>
  );
}

export default BadgePill;