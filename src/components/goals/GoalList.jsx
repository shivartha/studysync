import GoalItem from "./GoalItem";

function GoalList({ goals, onUpdateProgress, onDelete }) {
  if (goals.length === 0) {
    return <p className="empty-state">No goals yet — add one above.</p>;
  }

  return (
    <ul className="goal-list">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdateProgress={onUpdateProgress}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default GoalList;