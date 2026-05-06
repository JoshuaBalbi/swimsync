function GeneratedPracticePreview({ generatedText, onUse }) {
  if (!generatedText) return null;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Generated Practice</h4>

        <pre className="bg-light rounded-4 p-3 mb-3">
          {generatedText}
        </pre>

        <button className="btn btn-primary" onClick={onUse}>
          Use This Practice
        </button>
      </div>
    </div>
  );
}

export default GeneratedPracticePreview;