import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import generateId from "../utils/generateId";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import "./TasksPage.css";

function TasksPage() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.TASKS, []);
  // Read-only here — Tasks never modifies subjects, only reads them
  // to populate the dropdown and resolve badges. No setter needed.
  const [subjects] = useLocalStorage(STORAGE_KEYS.SUBJECTS, []);

  function handleAddTask(newTask) {
    setTasks([...tasks, { id: generateId(), completed: false, ...newTask }]);
  }

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

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm subjects={subjects} onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        subjects={subjects}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default TasksPage;