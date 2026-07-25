import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import PlannerPage from "./pages/PlannerPage";
import TasksPage from "./pages/TasksPage";
import PomodoroPage from "./pages/PomodoroPage";
import ProgressPage from "./pages/ProgressPage";
import GoalsPage from "./pages/GoalsPage";

// App.jsx has exactly ONE job: define which page renders for which URL.
// It should never contain feature logic — that keeps this file readable
// even after the project grows to 30+ components.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="planner" element={<PlannerPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="pomodoro" element={<PomodoroPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="goals" element={<GoalsPage />} />
      </Route>
    </Routes>
  );
}

export default App;