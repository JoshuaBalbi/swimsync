function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      className="btn btn-primary px-4"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;