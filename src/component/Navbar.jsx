import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Posture Coach", icon: "🧘" },
    { path: "/health", label: "Wellness Tips", icon: "🌿" },
  ];

  return (
    <nav className="nav-container">
      <div className="nav-glass-wrapper">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;