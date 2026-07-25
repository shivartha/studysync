import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

// Layout is the "shell" every page renders inside. It stays mounted across
// navigations — only <Outlet /> (the current page) swaps out — which is
// what keeps the sidebar from re-rendering/flickering on every route change.
function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;