import { useState } from "react";
import { generateClient } from "aws-amplify/data";

import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import FormTextarea from "../../components/ui/FormTextArea";
import GeneratedPracticePreview from "./GeneratedPracticePreview";

function AIPracticeGenerator({ onUseGeneratedPractice }) {
  const client = generateClient();

  const [formData, setFormData] = useState({
    practiceType: "Swim",
    focus: "Sprint",
    totalAmount: "5000 yards",
    level: "Intermediate",
    notes: "",
  });

  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

    function extractCoachNotes(text) {
        const match = text.match(/Coach Notes:\s*([\s\S]*)/i);
        return match ? match[1].trim() : "";
    }

    function removeCoachNotes(text) {
        return text.replace(/Coach Notes:\s*[\s\S]*/i, "").trim();
    }

  async function handleGenerate(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await client.queries.generatePractice(formData);

      if (result.errors) {
        console.error(result.errors);
        alert("Could not generate practice.");
        return;
      }

      setGeneratedText(result.data);
    } catch (error) {
      console.error("Error generating practice:", error);
      alert("Could not generate practice.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h3 className="fw-bold text-primary mb-3">
            AI Practice Builder
          </h3>

          <form onSubmit={handleGenerate}>
            <div className="row g-3">
              <div className="col-md-3">
                <FormSelect
                  label="Practice Type"
                  name="practiceType"
                  value={formData.practiceType}
                  onChange={handleChange}
                  options={[
                    { value: "Swim", label: "Swim" },
                    { value: "Dryland", label: "Dryland" },
                    { value: "Lift", label: "Lift" },
                  ]}
                />
              </div>

              <div className="col-md-3">
                <FormSelect
                  label="Focus"
                  name="focus"
                  value={formData.focus}
                  onChange={handleChange}
                  options={[
                    { value: "Sprint", label: "Sprint" },
                    { value: "Distance", label: "Distance" },
                    { value: "IM", label: "IM" },
                    { value: "Stroke", label: "Stroke" },
                    { value: "Recovery", label: "Recovery" },
                    { value: "Technique", label: "Technique" },
                  ]}
                />
              </div>

              <div className="col-md-3">
                <FormInput
                  label="Yardage / Duration"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  placeholder="5000 yards or 75 min"
                />
              </div>

              <div className="col-md-3">
                <FormSelect
                  label="Level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  options={[
                    { value: "Beginner", label: "Beginner" },
                    { value: "Intermediate", label: "Intermediate" },
                    { value: "Advanced", label: "Advanced" },
                    { value: "College", label: "College" },
                  ]}
                />
              </div>

              <div className="col-12">
                <FormTextarea
                  label="Coach Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Example: include 100 pace work, underwater focus, avoid too much kick..."
                />
              </div>
            </div>

            <button className="btn btn-primary mt-4" disabled={loading}>
              {loading ? "Generating..." : "Generate Practice"}
            </button>
          </form>
        </div>
      </div>

      <GeneratedPracticePreview
        generatedText={generatedText}
        onUse={() =>
            onUseGeneratedPractice({
            workoutText: removeCoachNotes(generatedText),
            notes: extractCoachNotes(generatedText),
            type: formData.practiceType,
            focus: formData.focus,
            totalAmount: formData.totalAmount,
            })
        }
        />
    </>
  );
}

export default AIPracticeGenerator;