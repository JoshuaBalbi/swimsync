import ButtonGroup from "../../components/ui/ButtonGroup";

function AttendanceRow({ swimmer, attendance, onChange }) {
  const currentStatus = attendance?.status || "";

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body p-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <h5 className="fw-bold text-primary mb-1">{swimmer.userName}</h5>
            <p className="text-muted mb-0 text-capitalize">{swimmer.role}</p>
          </div>

          <div className="col-md-5">
            <ButtonGroup
                value={currentStatus}
                onChange={(status) =>
                    onChange(swimmer, {
                    ...attendance,
                    status,
                    })
                }
                options={[
                    { value: "present", label: "Present" },
                    { value: "absent", label: "Absent" },
                    { value: "excused", label: "Excused" },
                ]}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Notes"
              value={attendance?.notes || ""}
              onChange={(e) =>
                onChange(swimmer, {
                  ...attendance,
                  notes: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceRow;