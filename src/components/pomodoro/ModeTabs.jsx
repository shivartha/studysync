import { POMODORO_MODES } from "../../constants/pomodoroSettings";
import "./ModeTabs.css";

// Purely presentational — receives the active mode and hands clicks
// back up via onSelectMode. Doesn't touch the timer itself at all.
function ModeTabs({ activeMode, onSelectMode }) {
  return (
    <div className="mode-tabs">
      {Object.values(POMODORO_MODES).map((mode) => (
        <button
          key={mode.key}
          className={mode.key === activeMode ? "mode-tab active" : "mode-tab"}
          onClick={() => onSelectMode(mode)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}

export default ModeTabs;