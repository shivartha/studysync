import { useState, useEffect } from "react";

// A drop-in replacement for useState that also persists the value to
// localStorage. Any component can call this exactly like useState —
// it doesn't need to know localStorage is involved at all.
function useLocalStorage(key, initialValue) {
  // Lazy initializer: this function only runs ONCE, on first render —
  // not on every re-render. Important, because reading/parsing
  // localStorage on every render would be wasted work.
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // If localStorage is unavailable or the stored JSON is corrupted,
      // fail safely back to the default instead of crashing the app.
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Whenever `value` changes, write it back to localStorage. This keeps
  // state and storage in sync automatically — the calling component
  // never has to remember to save.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // Same return shape as useState: [currentValue, setterFunction]
  return [value, setValue];
}

export default useLocalStorage;