import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import StatCard from "../components/dashboard/StatCard";
import "./DashboardPage.css";

function DashboardPage() {
  // Default to [] — until the Subjects/Tasks/Goals features are built,
  // these keys simply don't exist yet in localStorage, and useLocalStorage
  // falls back to this initial value.
  const [subjects] = useLocalStorage(STORAGE_KEYS.SUBJECTS, []);
  const [tasks] = useLocalStorage(STORAGE_KEYS.TASKS, []);
  const [goals] = useLocalStorage(STORAGE_KEYS.GOALS, []);

  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const activeGoals = goals.filter((goal) => !goal.completed).length;

  const hasNoData =
    subjects.length === 0 && tasks.length === 0 && goals.length === 0;

  return (
    <div>
      <h1>Dashboard</h1>

      {hasNoData ? (
        // An explicit empty state (not just a blank page) is a small
        // detail that separates a real app from a demo — it tells a
        // first-time user what to do next instead of showing nothing.
        <p className="empty-state">
          No data yet — add a subject or task to see your stats here.
        </p>
      ) : (
        <div className="stat-grid">
          <StatCard icon="📚" label="Subjects" value={subjects.length} />
          <StatCard icon="✅" label="Pending Tasks" value={pendingTasks} />
          <StatCard icon="🎯" label="Active Goals" value={activeGoals} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;