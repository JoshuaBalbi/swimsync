function BackButton({ onClick, label = "Back" }) {
  return (
    <button className="btn btn-light" onClick={onClick}>
      {label}
    </button>
  );
}

export default BackButton;