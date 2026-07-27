import { useState } from "react";
import "./GoalForm.css";

// A goal is a title + a numeric target (e.g. "Solve DSA problems", target 50).
// Progress itself isn't set here — it starts at 0 and gets updated from
// GoalItem later, via +/- buttons. This form only creates the goal.
function GoalForm({ onAddGoal }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const targetNumber = Number(target);

    // Guard against empty title AND invalid/zero target — a goal with
    // a target of 0 would show as "already complete" immediately, which
    // is misleading rather than useful.
    if (trimmedTitle === "" || !targetNumber || targetNumber <= 0) return;

    onAddGoal({
      title: trimmedTitle,
      target: targetNumber,
      unit: unit.trim() || "units",
    });

    setTitle("");
    setTarget("");
    setUnit("");
  }

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal (e.g. Solve DSA problems)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target"
        min="1"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <input
        type="text"
        placeholder="Unit (e.g. problems, hours)"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Add Goal
      </button>
    </form>
  );
}

export default GoalForm;