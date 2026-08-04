// Centralizing durations here (in seconds, since our timer counts down
// in seconds) means changing "25 minutes" to "30 minutes" later is a
// one-line edit, not a hunt through timer logic.
export const POMODORO_MODES = {
  WORK: { key: "WORK", label: "Focus", seconds: 25 * 60 },
  SHORT_BREAK: { key: "SHORT_BREAK", label: "Short Break", seconds: 5 * 60 },
  LONG_BREAK: { key: "LONG_BREAK", label: "Long Break", seconds: 15 * 60 },
};