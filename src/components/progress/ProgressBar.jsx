import "./ProgressBar.css";

// Generic, reusable — same component powers the overall task-completion
// bar AND every per-subject bar. It doesn't know or care what the
// percentage represents.
function ProgressBar({ percent, color }) {
  return (
    <div className="progress-bar-track">
      <div
        className="progress-bar-fill"
        style={{
          width: `${percent}%`,
          backgroundColor: color || "var(--color-primary)",
        }}
      />
    </div>
  );
}

export default ProgressBar;