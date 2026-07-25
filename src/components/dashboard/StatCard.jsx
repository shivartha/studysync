import "./StatCard.css";

// A small, fully reusable "number + label" card. Props-driven, no
// internal state — this is a classic "dumb"/presentational component:
// it just displays whatever data it's handed.
function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;