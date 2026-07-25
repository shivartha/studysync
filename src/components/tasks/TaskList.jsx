import TaskItem from "./TaskItem";

// This is the one place that resolves subjectId -> the actual subject
// object, via .find(). TaskItem never has to search an array itself.
function TaskList({ tasks, subjects, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet — add one above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          subject={subjects.find((s) => s.id === task.subjectId)}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;