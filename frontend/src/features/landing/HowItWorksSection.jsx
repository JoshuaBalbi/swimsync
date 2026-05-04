import SectionHeader from "../../components/ui/SectionHeader";

function HowItWorksSection() {
  return (
    <section className="section-muted py-5 border-top border-bottom">
      <div className="container">
        <SectionHeader
          title="How SwimSync Works"
          subtitle="A simple workflow for coaches and swimmers."
        />

        <div className="row g-4">
          <div className="col-md-4">
            <div className="text-center p-4">
              <div
                className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "60px", height: "60px" }}
              >
                1
              </div>
              <h5 className="fw-bold">Create Team Content</h5>
              <p className="text-muted mb-0">
                Coaches create practices, upload meet files, and manage team schedules.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="text-center p-4">
              <div
                className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "60px", height: "60px" }}
              >
                2
              </div>
              <h5 className="fw-bold">Log Training</h5>
              <p className="text-muted mb-0">
                Swimmers log swim practices, lifts, dryland, attendance, and meet results.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="text-center p-4">
              <div
                className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "60px", height: "60px" }}
              >
                3
              </div>
              <h5 className="fw-bold">Track Progress</h5>
              <p className="text-muted mb-0">
                Coaches and swimmers view attendance, personal bests, and progression over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;