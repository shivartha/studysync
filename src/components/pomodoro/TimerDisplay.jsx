import "./TimerDisplay.css";

// Converts raw seconds into MM:SS. This formatting logic lives here,
// not in the hook — useCountdown deals in raw seconds so it stays
// generic; formatting is a display concern, not a timer concern.
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // padStart ensures "05" instead of "5" — a timer that jumps between
  // 1 and 2 digits looks visually broken.
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function TimerDisplay({ secondsLeft }) {
  return <div className="timer-display">{formatTime(secondsLeft)}</div>;
}

export default TimerDisplay;