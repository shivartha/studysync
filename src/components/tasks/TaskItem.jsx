import "./TaskItem.css";

// `subject` is passed in already-resolved (not just subjectId) — see the
// lookup in TaskList — so this component stays purely presentational
// and doesn't need to know how to search the subjects array itself.
function TaskItem({ task, subject, onToggle, onDelete }) {
  return (
    <li className={task.completed ? "task-item completed" : "task-item"}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <div className="task-info">
        <span className="task-title">{task.title}</span>
        <div className="task-meta">
          {subject && (
            <span className="task-subject-badge">
              <span
                className="task-subject-dot"
                style={{ backgroundColor: subject.color }}
              />
              {subject.name}
            </span>
          )}
          {task.dueDate && <span className="task-due">Due {task.dueDate}</span>}
        </div>
      </div>

      <button
        className="btn-delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        ✕
      </button>
    </li>
  );
}

export default TaskItem;