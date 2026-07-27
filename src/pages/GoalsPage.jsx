import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import generateId from "../utils/generateId";
import GoalForm from "../components/goals/GoalForm";
import GoalList from "../components/goals/GoalList";
import "./GoalsPage.css";

function GoalsPage() {
  const [goals, setGoals] = useLocalStorage(STORAGE_KEYS.GOALS, []);

  function handleAddGoal(newGoal) {
    setGoals([
      ...goals,
      { id: generateId(), current: 0, completed: false, ...newGoal },
    ]);
  }

  function handleUpdateProgress(id, delta) {
    setGoals(
      goals.map((goal) => {
        if (goal.id !== id) return goal;

        // Prevent negative progress from the "−" button, and recompute
        // `completed` every time progress changes — this is what keeps
        // the Dashboard's "Active Goals" count accurate without any
        // extra syncing logic.
        const newCurrent = Math.max(0, goal.current + delta);
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target,
        };
      })
    );
  }

  function handleDeleteGoal(id) {
    setGoals(goals.filter((goal) => goal.id !== id));
  }

  return (
    <div>
      <h1>Goals</h1>
      <GoalForm onAddGoal={handleAddGoal} />
      <GoalList
        goals={goals}
        onUpdateProgress={handleUpdateProgress}
        onDelete={handleDeleteGoal}
      />
    </div>
  );
}

export default GoalsPage;