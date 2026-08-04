import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import {
  getTaskCompletionStats,
  getSubjectBreakdown,
  getGoalsOverview,
} from "../utils/statsHelpers";
import StatCard from "../components/dashboard/StatCard";
import ProgressBar from "../components/progress/ProgressBar";
import SubjectBreakdown from "../components/progress/SubjectBreakdown";
import "./ProgressPage.css";

// This page reads FOUR different localStorage keys but writes to NONE —
// it's a pure "view" over data owned by other features. That read-only
// role is exactly why it lives at the end of the build order: it needed
// the other features to exist first to have anything to show.
function ProgressPage() {
  const [subjects] = useLocalStorage(STORAGE_KEYS.SUBJECTS, []);
  const [tasks] = useLocalStorage(STORAGE_KEYS.TASKS, []);
  const [goals] = useLocalStorage(STORAGE_KEYS.GOALS, []);
  const [pomodoroSessions] = useLocalStorage(STORAGE_KEYS.POMODORO_SESSIONS, 0);

  const taskStats = getTaskCompletionStats(tasks);
  const subjectStats = getSubjectBreakdown(subjects, tasks);
  const goalStats = getGoalsOverview(goals);

  return (
    <div>
      <h1>Progress</h1>

      <div className="stat-grid">
        <StatCard icon="✅" label="Task Completion" value={`${taskStats.percent}%`} />
        <StatCard icon="🎯" label="Goals Completed" value={`${goalStats.completed}/${goalStats.total}`} />
        <StatCard icon="⏱️" label="Focus Sessions" value={pomodoroSessions} />
      </div>

      <section className="progress-section">
        <h2>Overall Task Completion</h2>
        <ProgressBar percent={taskStats.percent} />
        <p className="progress-subtext">
          {taskStats.completed} of {taskStats.total} tasks completed
        </p>
      </section>

      <section className="progress-section">
        <h2>By Subject</h2>
        <SubjectBreakdown subjectStats={subjectStats} />
      </section>
    </div>
  );
}

export default ProgressPage;