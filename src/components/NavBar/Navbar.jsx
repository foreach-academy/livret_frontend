import React, { useContext, useEffect, useState } from 'react';
import '../../styles/NavBar/Navbar.css'; 
import logo from '../../assets/images/ForEach_hor_white.png';
import AuthContext from '../../Context/AuthContext';
import UserServices from '../../Services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, setToken } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfilDropdown = (event) => {
    event.stopPropagation();
    document.querySelector(".dropdown-profil-content").classList.toggle("show");
  }

  // Deconnexion
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setToken(null);
    UserServices.logout();
    navigateTo('/')
    toast.success("Vous êtes déconnecté");
  }

  // Hamburger menu mobile
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    // const navMenu = document.querySelector(".nav-menu");
    const navLink = document.querySelectorAll(".nav-link");
    const hamburgerIcon = document.querySelector(".hamburger .material-icons-outlined");

    const mobileMenu = () => {
      setIsMenuOpen(prevState => !prevState); // Met à jour l'état local du menu
      if (!isMenuOpen) {
        hamburgerIcon.innerText = "close";
      } else {
        hamburgerIcon.innerText = "menu";
      }
    };

    // Fermeture du menu au clic sur un lien
    const closeMenu = () => {
      setIsMenuOpen(false); // Réinitialise l'état du menu
      hamburgerIcon.innerText = "menu"; // Réinitialise l'icône
    };

    hamburger.addEventListener("click", mobileMenu);
    navLink.forEach(n => n.addEventListener("click", closeMenu));

    return () => {
      hamburger.removeEventListener("click", mobileMenu);
      navLink.forEach(link => {
        link.removeEventListener("click", closeMenu);
      });
    }
  }, [isMenuOpen]); // Dépendance à isMenuOpen

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Logo Foreach Academy" className="logo-image" />
            </a>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {isAuthenticated && <>
              <li className="dropdown" onClick={toggleDropdown}>
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  <span>Livrets de suivi </span>
                  <span className="material-icons-outlined">expand_more</span>
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className='nav-link'><a href="/1/assistant-ressources-humaines">Assistant Ressources Humaines (ARH)</a></li>
                    <li className='nav-link'><a href="/2/concepteur-developpeur-application">Concepteur Développeur d'Application (CDA)</a></li>
                    <li className='nav-link'><a href="/3/mastere-architecte-web">Mastère Architecte Web</a></li>
                  </ul>
                )}
              </li>
              <li><a href="/trainer-practical-life" className='nav-link'>Vie pratique du stagiaire</a></li>
            </>}
            {isAuthenticated && isAdmin && <>
              <li><a href="/users" className='nav-link'>Utilisateurs</a></li>
            </>}
            {/* {!isAuthenticated && <>
              <li className='nav-link'><button className="primary-button" onClick={() => { navigateTo('/login') }}>Se connecter</button></li>
              </>} */}
            {isAuthenticated && <>
              <li><a href="/contact" className='nav-link'>Contact</a></li>
              <li>
                <div className="dropdown-profil">
                  <div onClick={toggleProfilDropdown} className="dropdown-profil-button">
                    <span className="material-icons-outlined">account_circle</span>Profil
                  </div>
                  <ul id="myDropdown" className="dropdown-profil-content">
                    <li className="dropdown-profil-content-flex nav-link" onClick={logout}>
                      <span className="material-icons-outlined">logout</span>
                      <span>Se déconnecter</span>
                    </li>
                  </ul>
                </div>
              </li>
            </>}
          </ul>
          <div className='hamburger'>
            <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
