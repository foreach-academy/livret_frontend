import React from "react";
import {
  FRONT_ADMIN_DASHBOARD,
  FRONT_ADMIN_EVALUATION,
  FRONT_ADMIN_TRAINING,
  FRONT_ADMIN_USERS,
  FRONT_ADMIN_PROMOTION,
} from "../../../utils/frontUrl";
import TileNavbar from "./TileNavbar";

const NavbarAdmin = ({headerHeight}) => {
  const navbarTilesList = [
    {
      url: FRONT_ADMIN_DASHBOARD,
      logo: "Home.png",
      label: "Accueil",
    },
    {
      url: FRONT_ADMIN_USERS,
      logo: "Users.png",
      label: "Utilisateurs",
    },
    {
      url: FRONT_ADMIN_TRAINING,
      logo: "Trainings.png",
      label: "Formations",
    },
    {
      url: FRONT_ADMIN_PROMOTION,
      logo: "Promotions.png",
      label: "Promotions",
    },
    {
      url: FRONT_ADMIN_EVALUATION,
      logo: "Evaluations.png",
      label: "Evaluations",
    },
  ];

  return (
    <div className="navbar_admin-container" style={{height: `calc(100vh - ${headerHeight}px)`}}>
      <nav className="navbar_admin">
        <ul className="navbar_admin-list">
          {navbarTilesList.map((tile, index) => {
            return (
              <TileNavbar
                key={index}
                url={tile.url}
                logo={tile.logo}
                label={tile.label}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
