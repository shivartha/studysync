const DAY_MS = 24 * 60 * 60 * 1000;

// Strips the time portion so date comparisons aren't thrown off by
// hours/minutes/seconds — we only care about which DAY a task falls on.
function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Turns a raw due date string into a human category. This is the one
// place that decides what "Today" or "Overdue" means — every other
// file just trusts the label this returns.
export function categorizeDueDate(dueDate) {
  if (!dueDate) return "No Due Date";

  const today = startOfDay(new Date());
  const due = startOfDay(dueDate);
  const diffDays = Math.round((due - today) / DAY_MS);

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays <= 7) return "This Week";
  return "Later";
}

// Fixed order so groups always display in a sensible sequence, not
// however JavaScript happens to iterate object keys.
const CATEGORY_ORDER = [
  "Overdue",
  "Today",
  "Tomorrow",
  "This Week",
  "Later",
  "No Due Date",
];

export function groupTasksByDate(tasks) {
  const groups = {};

  tasks.forEach((task) => {
    const category = categorizeDueDate(task.dueDate);
    if (!groups[category]) groups[category] = [];
    groups[category].push(task);
  });

  // Only include categories that actually have tasks — no empty
  // "Overdue" heading with nothing under it.
  return CATEGORY_ORDER.filter((category) => groups[category]).map(
    (category) => ({ label: category, tasks: groups[category] })
  );
}