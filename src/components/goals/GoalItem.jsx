import "./GoalItem.css";

function GoalItem({ goal, onUpdateProgress, onDelete }) {
  // Clamp for display so an over-incremented value (e.g. 6/5) never
  // pushes the progress bar past 100% visually, even though the
  // underlying stored number can still exceed target.
  const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));

  return (
    <li className={goal.completed ? "goal-item completed" : "goal-item"}>
      <div className="goal-header">
        <span className="goal-title">{goal.title}</span>
        <button
          className="btn-delete"
          onClick={() => onDelete(goal.id)}
          aria-label={`Delete ${goal.title}`}
        >
          ✕
        </button>
      </div>

      <div className="goal-progress-track">
        <div className="goal-progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="goal-footer">
        <span className="goal-count">
          {goal.current} / {goal.target} {goal.unit}
        </span>
        <div className="goal-controls">
          <button onClick={() => onUpdateProgress(goal.id, -1)}>−</button>
          <button onClick={() => onUpdateProgress(goal.id, 1)}>+</button>
        </div>
      </div>
    </li>
  );
}

export default GoalItem;