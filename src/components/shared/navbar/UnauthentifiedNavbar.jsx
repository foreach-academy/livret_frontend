import React from "react";
import { FRONT_HOME } from "../../../utils/frontUrl";
import { Link } from "react-router-dom";

const UnauthentifiedNavbar = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <Link to={FRONT_HOME}>
              <img
                src={process.env.PUBLIC_URL + "/images/fe_logo.png"}
                alt="Logo Foreach Academy"
                className="logo-image"
              />{" "}
              {/* Image du logo */}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default UnauthentifiedNavbar;
