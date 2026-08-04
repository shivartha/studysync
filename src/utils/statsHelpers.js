// Pure functions — no React, no localStorage. Each one takes data in,
// returns computed numbers out. Keeping stats logic separate from the
// page component means it's independently testable and reusable.

export function getTaskCompletionStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent };
}

export function getSubjectBreakdown(subjects, tasks) {
  // For each subject, count how many tasks belong to it and how many
  // of those are done — this is what powers the per-subject bars.
  return subjects.map((subject) => {
    const subjectTasks = tasks.filter((task) => task.subjectId === subject.id);
    const completed = subjectTasks.filter((task) => task.completed).length;
    const percent =
      subjectTasks.length === 0
        ? 0
        : Math.round((completed / subjectTasks.length) * 100);

    return {
      id: subject.id,
      name: subject.name,
      color: subject.color,
      total: subjectTasks.length,
      completed,
      percent,
    };
  });
}

export function getGoalsOverview(goals) {
  const total = goals.length;
  const completed = goals.filter((goal) => goal.completed).length;
  // Average progress across ALL goals, not just completed ones — gives
  // a sense of overall momentum, not just a completion count.
  const avgPercent =
    total === 0
      ? 0
      : Math.round(
          goals.reduce(
            (sum, goal) => sum + Math.min(100, (goal.current / goal.target) * 100),
            0
          ) / total
        );

  return { total, completed, avgPercent };
}