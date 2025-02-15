import React, { useContext, useEffect, useState } from "react";
import "../../../styles/NavBar/Navbar.css";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import AuthenticateService from "../../../services/AuthenticateServices";
import {
  FRONT_ADMIN_USERS,
  FRONT_HOME,
  FRONT_LOGIN,
  FRONT_TRAINER_PRATICAL_LIFE,
} from "../../../utils/frontUrl";
import { navigateTo } from "../../../utils/navigate";

const Navbar = () => {
  const { isAdmin, setIsAuthenticated, setIsAdmin, setToken } =
    useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfilDropdown = (event) => {
    event.stopPropagation();
    document.querySelector(".dropdown-profil-content").classList.toggle("show");
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
    const hamburger = document.querySelector(".hamburger");
    const navLink = document.querySelectorAll(".nav-link");
    const hamburgerIcon = document.querySelector(
      ".hamburger .material-icons-outlined"
    );

    const mobileMenu = () => {
      setIsMenuOpen((prevState) => !prevState); // Inverse l'état actuel de isMenuOpen
      if (!isMenuOpen) {
        hamburgerIcon.innerText = "close"; // Affiche "close" quand le menu est ouvert
      } else {
        hamburgerIcon.innerText = "menu"; // Affiche "menu" quand le menu est fermé
      }
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
      hamburgerIcon.innerText = "menu";
    };

    hamburger.addEventListener("click", mobileMenu);
    navLink.forEach((n) => n.addEventListener("click", closeMenu));

    return () => {
      hamburger.removeEventListener("click", mobileMenu);
      navLink.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, [isMenuOpen]);

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
          <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {" "}
            {/* Affiche le menu avec une classe active si le menu mobile est ouvert */}
            <>
              <li>
                <Link to={FRONT_TRAINER_PRATICAL_LIFE} className="nav-link">
                  Vie pratique du stagiaire
                </Link>
              </li>{" "}
              {/* Lien vers vie pratique du stagiaire */}
              <li className="dropdown" onClick={toggleDropdown}>
                {" "}
                {/* Item de menu avec un sous-menu */}
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  <span>Livrets de suivi </span>
                  <span className="material-icons-outlined">
                    expand_more
                  </span>{" "}
                  {/* Icône d'extension pour le dropdown */}
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className="nav-link">
                      <a href="/formations/1">
                        Assistant Ressources Humaines (ARH)
                      </a>
                    </li>
                    <li className="nav-link">
                      <a href="/formations/2">
                        Concepteur Développeur d'Application (CDA)
                      </a>
                    </li>
                    <li className="nav-link">
                      <a href="/formations/3">Mastère Architecte Web</a>
                    </li>
                  </ul>
                )}
              </li>
            </>
            <li>
              <div className="dropdown-profil">
                <div
                  onClick={toggleProfilDropdown}
                  className="dropdown-profil-button"
                >
                  <span className="material-icons-outlined">
                    account_circle
                  </span>
                  Profil {/* Bouton de profil avec icône */}
                </div>
                <ul id="myDropdown" className="dropdown-profil-content">
                  {" "}
                  {/* Sous-menu pour le profil */}
                  {isAdmin && (
                    <li className="dropdown-profil-content-flex nav-link" onClick={() => {navigate(FRONT_ADMIN_USERS)}}>
                      <span className="material-icons-outlined">dashboard</span>
                      <span>Panneau Admin</span>{" "}
                    </li>
                  )}
                  <li
                    className="dropdown-profil-content-flex nav-link"
                    onClick={() => logout()}
                  >
                    <span className="material-icons-outlined">logout</span>
                    <span>Se déconnecter</span>{" "}
                    {/* Option pour se déconnecter */}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="hamburger">
            {" "}
            {/* Icône de menu hamburger pour les petits écrans */}
            <span className="material-icons-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>{" "}
            {/* Affiche 'close' ou 'menu' en fonction de l'état */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; // Exporte le composant Navbar
