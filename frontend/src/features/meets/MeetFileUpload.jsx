import { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import FormSelect from "../../components/ui/FormSelect";
import FileInput from "../../components/ui/FileInput";

function MeetFileUpload({ meetId, coachId, onUploaded }) {
  const [label, setLabel] = useState("Meet Info");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  function handleFileChange(e) {
    setFile(e.target.files?.[0] || null);
  }

  async function handleUpload() {
    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    try {
      setUploading(true);

      const safeFileName = file.name.replace(/\s+/g, "_");
      const path = `meet-files/${meetId}/${Date.now()}-${safeFileName}`;

      const result = await uploadData({
        path,
        data: file,
      }).result;

      onUploaded({
        label,
        fileName: file.name,
        s3Path: result.path,
        uploadedByCoachId: coachId,
        uploadedAt: new Date().toISOString(),
      });

      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Could not upload file.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Upload Meet File</h4>

        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <FormSelect
              label="File Type"
              name="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              options={[
                { value: "Meet Info", label: "Meet Info" },
                { value: "Entries", label: "Entries" },
                { value: "Psych Sheet", label: "Psych Sheet" },
                { value: "Timeline", label: "Timeline" },
                { value: "Heat Sheet", label: "Heat Sheet" },
                { value: "Results", label: "Results" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>

          <div className="col-md-5">
            <FileInput
              label="File"
              name="meetFile"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
            />
          </div>

          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetFileUpload;