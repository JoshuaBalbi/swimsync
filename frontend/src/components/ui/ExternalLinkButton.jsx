function ExternalLinkButton({ href, children }) {
  if (!href) return null;

  return (
    <a
      className="btn btn-outline-primary btn-sm"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default ExternalLinkButton;