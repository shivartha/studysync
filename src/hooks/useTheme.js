import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";

// Builds on useLocalStorage (not a separate mechanism) — theme
// preference is just another piece of persisted state, same pattern
// as everything else in this app.
function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, "light");

  // Whenever `theme` changes, apply it to the real DOM by setting the
  // data-theme attribute on <html> — this is the attribute variables.css
  // has been watching for since day one via [data-theme="dark"].
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return { theme, toggleTheme };
}

export default useTheme;