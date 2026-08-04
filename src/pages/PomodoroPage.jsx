import { useState } from "react";
import useCountdown from "../hooks/useCountdown";
import useLocalStorage from "../hooks/useLocalStorage";
import { POMODORO_MODES } from "../constants/pomodoroSettings";
import { STORAGE_KEYS } from "../constants/storageKeys";
import ModeTabs from "../components/pomodoro/ModeTabs";
import TimerDisplay from "../components/pomodoro/TimerDisplay";
import "./PomodoroPage.css";

function PomodoroPage() {
  const [activeMode, setActiveMode] = useState(POMODORO_MODES.WORK);
  const [completedSessions, setCompletedSessions] = useLocalStorage(
    STORAGE_KEYS.POMODORO_SESSIONS,
    0
  );

  // When a WORK session finishes naturally, count it. Breaks don't count
  // as completed study sessions, so we only increment for that mode.
  function handleComplete() {
    if (activeMode.key === "WORK") {
      setCompletedSessions(completedSessions + 1);
    }
  }

  const { secondsLeft, isRunning, start, pause, reset } = useCountdown(
    activeMode.seconds,
    handleComplete
  );

  function handleSelectMode(mode) {
    setActiveMode(mode);
    reset(mode.seconds); // switching modes should reset the clock to the new duration
  }

  return (
    <div>
      <h1>Pomodoro Timer</h1>

      <ModeTabs activeMode={activeMode.key} onSelectMode={handleSelectMode} />

      <TimerDisplay secondsLeft={secondsLeft} />

      <div className="timer-controls">
        {isRunning ? (
          <button className="btn-primary" onClick={pause}>
            Pause
          </button>
        ) : (
          <button className="btn-primary" onClick={start}>
            Start
          </button>
        )}
        <button onClick={() => reset(activeMode.seconds)}>Reset</button>
      </div>

      <p className="session-count">
        Focus sessions completed today: {completedSessions}
      </p>
    </div>
  );
}

export default PomodoroPage;