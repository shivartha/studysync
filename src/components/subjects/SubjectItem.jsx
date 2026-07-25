import "./SubjectItem.css";

// A single row — purely presentational. It receives one subject and
// two callback props; it doesn't know HOW deletion happens, only that
// it should call onDelete when the button is clicked.
function SubjectItem({ subject, onDelete }) {
  return (
    <li className="subject-item">
      <span
        className="subject-color-dot"
        style={{ backgroundColor: subject.color }}
      />
      <span className="subject-name">{subject.name}</span>
      <button
        className="btn-delete"
        onClick={() => onDelete(subject.id)}
        aria-label={`Delete ${subject.name}`}
      >
        ✕
      </button>
    </li>
  );
}

export default SubjectItem;