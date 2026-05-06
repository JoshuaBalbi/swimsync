import { useState } from "react";
import { getUrl } from "aws-amplify/storage";
import EmptyState from "../../components/ui/EmptyState";

function MeetFileList({ files = [] }) {
  const [openingFileId, setOpeningFileId] = useState("");

  async function handleOpenFile(file) {
    try {
      setOpeningFileId(file.id);

      const result = await getUrl({
        path: file.s3Path,
        options: {
          validateObjectExistence: true,
          expiresIn: 3600,
        },
      });

      window.open(result.url.toString(), "_blank");
    } catch (error) {
      console.error("Error opening file:", error);
      alert("Could not open file.");
    } finally {
      setOpeningFileId("");
    }
  }

  if (files.length === 0) {
    return <EmptyState message="No meet files have been uploaded yet." />;
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">Meet Files</h4>

        {files.map((file) => (
          <div
            key={file.id}
            className="d-flex justify-content-between align-items-center border-bottom py-3"
          >
            <div>
              <h6 className="fw-bold mb-1">{file.label}</h6>
              <p className="text-muted mb-0">{file.fileName}</p>
            </div>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleOpenFile(file)}
              disabled={openingFileId === file.id}
            >
              {openingFileId === file.id ? "Opening..." : "Open"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetFileList;