import ProgressBar from "./ProgressBar";
import "./SubjectBreakdown.css";

function SubjectBreakdown({ subjectStats }) {
  if (subjectStats.length === 0) {
    return (
      <p className="empty-state">
        Add subjects and tasks to see a per-subject breakdown here.
      </p>
    );
  }

  return (
    <div className="subject-breakdown">
      {subjectStats.map((subject) => (
        <div key={subject.id} className="subject-stat-row">
          <div className="subject-stat-header">
            <span className="subject-stat-name">{subject.name}</span>
            <span className="subject-stat-count">
              {subject.completed}/{subject.total} tasks
            </span>
          </div>
          <ProgressBar percent={subject.percent} color={subject.color} />
        </div>
      ))}
    </div>
  );
}

export default SubjectBreakdown;