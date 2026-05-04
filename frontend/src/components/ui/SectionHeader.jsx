function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-5">
      <h2 className="fw-bold">{title}</h2>
      <p className="text-muted">{subtitle}</p>
    </div>
  );
}

export default SectionHeader;