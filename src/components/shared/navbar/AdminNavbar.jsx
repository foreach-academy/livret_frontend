import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FRONT_ADMIN_DASHBOARD,
  FRONT_ADMIN_EVALUATION,
  FRONT_ADMIN_TRAINING,
  FRONT_ADMIN_USERS,
  FRONT_ADMIN_PROMOTION,
} from "../../../utils/frontUrl";

const NavbarAdmin = () => {
  const location = useLocation(); // Récupérer la route actuelle

  return (
    <div className="navbar_admin-container">
      <nav className="navbar_admin">
        <ul className="navbar_admin-list">
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_DASHBOARD ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_DASHBOARD}>Accueil</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_USERS ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_USERS}>Utilisateurs</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_TRAINING ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_TRAINING}>Formations</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_PROMOTION ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_PROMOTION}>Promotion</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_EVALUATION ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_EVALUATION}>Évaluations</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
