// Centralizing every localStorage key name in one place prevents a real
// bug class: typo one key string in Tasks.jsx and another in
// Dashboard.jsx, and the two features silently stop talking to each
// other. Every feature imports from here instead of typing raw strings.
export const STORAGE_KEYS = {
  SUBJECTS: "studysync_subjects",
  TASKS: "studysync_tasks",
  GOALS: "studysync_goals",
  THEME: "studysync_theme",
};