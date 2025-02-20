import React, { useContext, useEffect, useState, useRef } from "react";
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
  const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, setToken, isTrainer } =
    useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const hamburgerRef = useRef(null); // Référence pour le bouton hamburger

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfilDropdown = (event) => {
    event.stopPropagation();
    document.querySelector(".dropdown-profil-content")?.classList.toggle("show");
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
    const hamburger = hamburgerRef.current;
    const navLinks = document.querySelectorAll(".nav-link");
    const hamburgerIcon = document.querySelector(".hamburger .material-icons-outlined");

    if (!hamburger || !hamburgerIcon) return; // Vérification que l'élément existe

    const mobileMenu = () => {
      setIsMenuOpen((prevState) => !prevState);
      hamburgerIcon.innerText = isMenuOpen ? "menu" : "close";
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
      hamburgerIcon.innerText = "menu";
    };

    hamburger.addEventListener("click", mobileMenu);
    navLinks.forEach((n) => n.addEventListener("click", closeMenu));

    return () => {
      hamburger.removeEventListener("click", mobileMenu);
      navLinks.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, [isMenuOpen]); // Exécuter l'effet uniquement si `isMenuOpen` change

  return (
    <header >
      <div className="container">
        <nav>
          <div className="logo">
            <Link to={FRONT_HOME}>
              <img
                src={process.env.PUBLIC_URL + "/images/fe_logo.png"}
                alt="Logo Foreach Academy"
                className="logo-image"
              />
            </Link>
          </div>
          {isAuthenticated && (
            <>
              <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                <li>
                  <Link to={FRONT_TRAINER_PRATICAL_LIFE} className="nav-link">
                    Vie pratique du stagiaire
                  </Link>
                </li>
                <li className="dropdown" onClick={toggleDropdown}>
                  <div className="dropdown-toggle">
                    <span>Livrets de suivi </span>
                    <span className="material-icons-outlined">expand_more</span>
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
                <li>
                  <div className="dropdown-profil">
                    <div
                      onClick={toggleProfilDropdown}
                      className="dropdown-profil-button"
                    >
                      <span className="material-icons-outlined">
                        account_circle
                      </span>
                      Profil
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
