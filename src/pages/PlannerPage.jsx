import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { groupTasksByDate } from "../utils/dateHelpers";
import TaskItem from "../components/tasks/TaskItem";
import "./PlannerPage.css";

// Notice this page has NO add/delete/toggle logic of its own beyond
// wiring TaskItem's existing callbacks — it reuses the same TaskItem
// component from the Tasks feature. Same data, same row UI, just
// grouped differently. That's the reuse this file is built around.
function PlannerPage() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.TASKS, []);
  const [subjects] = useLocalStorage(STORAGE_KEYS.SUBJECTS, []);

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const groupedTasks = groupTasksByDate(tasks);

  return (
    <div>
      <h1>Planner</h1>

      {tasks.length === 0 ? (
        <p className="empty-state">
          No tasks scheduled yet — add tasks with due dates from the Tasks
          page to see them here.
        </p>
      ) : (
        groupedTasks.map((group) => (
          <div key={group.label} className="planner-group">
            <h2 className="planner-group-label">{group.label}</h2>
            <ul className="task-list">
              {group.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  subject={subjects.find((s) => s.id === task.subjectId)}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default PlannerPage;