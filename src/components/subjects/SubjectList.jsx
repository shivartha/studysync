import SubjectItem from "./SubjectItem";

// Handles the "list vs empty" branching in one place, so SubjectsPage
// doesn't need an if/else of its own.
function SubjectList({ subjects, onDelete }) {
  if (subjects.length === 0) {
    return <p className="empty-state">No subjects yet — add one above.</p>;
  }

  return (
    <ul className="subject-list">
      {subjects.map((subject) => (
        <SubjectItem key={subject.id} subject={subject} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default SubjectList;