import { useState } from "react";
import { SUBJECT_COLORS } from "../../constants/subjectColors";
import "./SubjectForm.css";

// This component only manages its OWN input state (name, color) and
// hands off the finished object via onAddSubject. It has no idea
// localStorage exists — that separation is what makes it reusable
// and easy to test in isolation.
function SubjectForm({ onAddSubject }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(SUBJECT_COLORS[0]);

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's default full-page reload

    const trimmedName = name.trim();
    if (trimmedName === "") return; // guard against empty/whitespace-only names

    onAddSubject({ name: trimmedName, color });

    // Reset the form for the next entry
    setName("");
    setColor(SUBJECT_COLORS[0]);
  }

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Subject name (e.g. Data Structures)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="color-picker">
        {SUBJECT_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className={c === color ? "color-swatch selected" : "color-swatch"}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>

      <button type="submit" className="btn-primary">
        Add Subject
      </button>
    </form>
  );
}

export default SubjectForm;