import { useState, useEffect, useRef } from "react";

// A generic countdown timer. It knows nothing about "Pomodoro" or
// "work/break" — it just counts a number of seconds down to 0 and
// calls onComplete. That makes it reusable for any future countdown
// feature, not locked to this one.
function useCountdown(initialSeconds, onComplete) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  // useRef, not useState, for the interval ID — we need to store a
  // value that survives across renders but changing it should NOT
  // trigger a re-render (unlike state). It's just a "box" to remember
  // the interval so we can clear it later.
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup: runs before the effect re-runs, and when the component
    // unmounts. Without this, pausing/resuming or leaving the page
    // would leave old intervals running in the background, silently
    // stacking up and ticking faster than intended.
    return () => clearInterval(intervalRef.current);
  }, [isRunning, onComplete]);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  // Resets to a given duration (used when switching modes) and stops
  // the timer, so switching from Focus to Break doesn't keep running.
  function reset(newSeconds = initialSeconds) {
    setIsRunning(false);
    setSecondsLeft(newSeconds);
  }

  return { secondsLeft, isRunning, start, pause, reset };
}

export default useCountdown;