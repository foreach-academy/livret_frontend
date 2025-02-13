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
  const location = useLocation(); 

  return (
    <div className="navbar_admin-container">
      <nav className="navbar_admin">
        <ul className="navbar_admin-list">
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_DASHBOARD ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_DASHBOARD}> <img src="/images/icons/Home.png" alt="homelogo" /> Accueil</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_USERS ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_USERS}><img src="/images/icons/Users.png" alt="Userslogo" /> Utilisateurs</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_TRAINING ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_TRAINING}><img src="/images/icons/Trainings.png" alt="Trainingslogo" /> Formations</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_PROMOTION ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_PROMOTION}><img src="/images/icons/Promotions.png" alt="Promotionslogo" /> Promotion</Link>
          </li>
          <span className="navbar-separator"></span>
          <li className={`navbar_admin-item ${location.pathname === FRONT_ADMIN_EVALUATION ? "active" : ""}`}>
            <Link to={FRONT_ADMIN_EVALUATION}><img src="/images/icons/Evaluations.png" alt="Evaluationslogo" /> Évaluations</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
