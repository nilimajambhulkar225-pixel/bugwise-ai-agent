import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const links = [
  ["Dashboard", "/app"],
  ["Analyze Bug", "/app/analyze"],
  ["Analysis History", "/app/history"],
  ["Saved Reports", "/app/saved"],
  ["Settings", "/app/settings"],
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <button className="brand brand-button" onClick={() => navigate("/app")}>
          <span className="brand-mark">B</span>
          <span>BugWise <em>AI</em></span>
        </button>
        <nav className="sidebar-nav">
          <p className="nav-label">Workspace</p>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === "/app"} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          <strong>Build with clarity.</strong>
          <span>Turn noisy bug reports into a focused next step.</span>
        </div>
      </aside>
      <div className="app-content">
        <header className="app-header">
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">Menu</button>
          <span className="header-kicker">AI debugging workspace</span>
          <button className="avatar" onClick={() => navigate("/app/settings")} aria-label="Open settings">BW</button>
        </header>
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  );
}
