import "./ThemeToggle.css";

// Purely presentational — receives current theme + a click handler,
// same "dumb component, parent owns logic" pattern used throughout.
function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;