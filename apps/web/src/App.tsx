import { NavLink, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { PatientsPage } from "./pages/PatientsPage";
import { AdminPage } from "./pages/AdminPage";

export function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">AI Hospital Ops</p>
          <h1>Smart Queue Platform</h1>
          <p className="sidebar-copy">
            Dynamic waiting-time predictions, patient arrival guidance, and queue
            visibility for staff.
          </p>
        </div>

        <nav className="nav-links">
          <NavLink to="/">Operations Dashboard</NavLink>
          <NavLink to="/patients">Patient Portal</NavLink>
          <NavLink to="/admin">Admin Console</NavLink>
        </nav>
      </aside>

      <main className="main-panel">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}
