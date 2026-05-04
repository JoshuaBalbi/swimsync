function EmptyState({ message }) {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4 text-center text-muted">
        {message}
      </div>
    </div>
  );
}

export default EmptyState;