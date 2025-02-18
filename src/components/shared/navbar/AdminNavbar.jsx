import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FRONT_ADMIN_DASHBOARD,
  FRONT_ADMIN_EVALUATION,
  FRONT_ADMIN_TRAINING,
  FRONT_ADMIN_USERS,
  FRONT_ADMIN_PROMOTION,
} from "../../../utils/frontUrl";
import ListNavbar from "./ComposantNavbar";

const NavbarAdmin = () => {
  const location = useLocation(); 

  return (
    <div className="navbar_admin-container">
      <nav className="navbar_admin">
        <ul className="navbar_admin-list">
          <ListNavbar url={FRONT_ADMIN_DASHBOARD} logo={"Home.png"} lien={"Accueil"}/>
          <ListNavbar url={FRONT_ADMIN_USERS} logo={"Users.png"} lien={"Utilisateur"}/>
          <ListNavbar url={FRONT_ADMIN_TRAINING} logo={"Trainings.png"} lien={"Formations"}/>
          <ListNavbar url={FRONT_ADMIN_PROMOTION} logo={"Promotions.png"} lien={"Promotion"}/>
          <ListNavbar url={FRONT_ADMIN_EVALUATION} logo={"Evaluations.png"} lien={"Evaluation"}/>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
