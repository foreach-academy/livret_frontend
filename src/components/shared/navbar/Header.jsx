import React, { useContext, useEffect, useState, useRef } from "react";
import "../../../styles/NavBar/Navbar.css";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AuthenticateService from "../../../services/AuthenticateServices";
import {
  FRONT_ADMIN_USERS,
  FRONT_HOME,
  FRONT_LOGIN,
  FRONT_TRAINER_PRATICAL_LIFE,
} from "../../../utils/frontUrl";
import { navigateTo } from "../../../utils/navigate";

const Header = ({ setHeaderHeight }) => {
  const {
    isAuthenticated,
    isAdmin,
    setIsAuthenticated,
    setIsAdmin,
    setToken,
    isTrainer,
    userName,
  } = useContext(AuthContext);
  const ref = useRef(null);
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const hamburgerRef = useRef(null); // Référence pour le bouton hamburger

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfilDropdown = (event) => {
    event.stopPropagation();
    document
      .querySelector(".dropdown-profil-content")
      ?.classList.toggle("show");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setToken(null);
    AuthenticateService.logout();
    navigateTo(FRONT_LOGIN, navigate);
    toast.success("Vous êtes déconnecté");
  };

  useEffect(() => {
    setHeaderHeight(ref?.current?.clientHeight);
  }, [ref?.current?.clientHeight]); // Exécuter l'effet uniquement si `isMenuOpen` change

  return (
    <header className="p-2" ref={ref}>
      <nav className="d-flex justify-content-between align-items-center">
        <Link to={FRONT_HOME}>
          <img
            src={process.env.PUBLIC_URL + "/images/fe_logo.png"}
            alt="Logo Foreach Academy"
            className="logo-image"
          />
        </Link>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to={FRONT_TRAINER_PRATICAL_LIFE} className="nav-link">
              Vie pratique du stagiaire
            </Link>
          </li>
        </ul>

        {isAuthenticated && (
          <>
            <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
              <li>
                <div className="dropdown-profil">
                  <div
                    onClick={toggleProfilDropdown}
                    className="dropdown-profil-button"
                  >
                    <span className="material-icons-outlined">
                      account_circle
                    </span>
                    {userName}
                  </div>
                  <ul id="myDropdown" className="dropdown-profil-content">
                    {(isAdmin || isTrainer) && (
                      <li
                        className="dropdown-profil-content-flex nav-link"
                        onClick={() => navigate(FRONT_ADMIN_USERS)}
                      >
                        <span className="material-icons-outlined">
                          dashboard
                        </span>
                        <span>Panneau Admin</span>
                      </li>
                    )}
                    <li
                      className="dropdown-profil-content-flex nav-link"
                      onClick={logout}
                    >
                      <span className="material-icons-outlined">logout</span>
                      <span>Se déconnecter</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className="hamburger" ref={hamburgerRef}>
              <span className="material-icons-outlined">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </div>
          </>
        )}
        {!isAuthenticated && (
          <div>
            <Link to={FRONT_LOGIN} className="primary-button">
              <span className="material-icons-outlined">home</span>
              <span>Se connecter</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
