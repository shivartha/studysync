import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "📊", end: true },
  { to: "/planner", label: "Planner", icon: "🗓️" },
  { to: "/subjects", label: "Subjects", icon: "📚" },
  { to: "/tasks", label: "Tasks", icon: "✅" },
  { to: "/pomodoro", label: "Pomodoro", icon: "⏱️" },
  { to: "/progress", label: "Progress", icon: "📈" },
  { to: "/goals", label: "Goals", icon: "🎯" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-logo">StudySync</h1>

      <nav>
        <ul className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;