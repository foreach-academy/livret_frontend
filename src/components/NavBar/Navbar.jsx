import React, { useContext, useEffect, useState } from 'react';
import '../../styles/NavBar/Navbar.css'; 
import logo from '../../assets/images/ForEach_hor_white.png';
import AuthContext from '../../Context/AuthContext';
import UserServices from '../../Services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

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
    const navLink = document.querySelectorAll(".nav-link");
    const hamburgerIcon = document.querySelector(".hamburger .material-icons-outlined");

    const mobileMenu = () => {
      setIsMenuOpen(prevState => !prevState); 
      hamburgerIcon.innerText = isMenuOpen ? "menu" : "close"; // Toggle icon text
    };

    // Fermeture du menu au clic sur un lien
    const closeMenu = () => {
      setIsMenuOpen(false); 
      hamburgerIcon.innerText = "menu"; 
    };

    hamburger.addEventListener("click", mobileMenu);
    navLink.forEach(n => n.addEventListener("click", closeMenu));

    return () => {
      hamburger.removeEventListener("click", mobileMenu);
      navLink.forEach(link => {
        link.removeEventListener("click", closeMenu);
      });
    }
  }, [isMenuOpen]);

  // Fonction pour sanitiser les URLs
  const sanitizeUrl = (url) => {
    return DOMPurify.sanitize(url, { ALLOWED_URI_REGEXP: /^(https?:\/\/[^\s]+)$/ });
  };

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo Foreach Academy" className="logo-image" />
            </Link>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {isAuthenticated && (
              <li className="dropdown" onClick={toggleDropdown}>
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  <span>Livrets de suivi </span>
                  <span className="material-icons-outlined">expand_more</span>
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className='nav-link'>
                      <Link to="/1/assistant-ressources-humaines">Assistant Ressources Humaines (ARH)</Link>
                    </li>
                    <li className='nav-link'>
                      <Link to="/2/concepteur-developpeur-application">Concepteur Développeur d'Application (CDA)</Link>
                    </li>
                    <li className='nav-link'>
                      <Link to="/3/mastere-architecte-web">Mastère Architecte Web</Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <li><Link to="/organisme" className='nav-link'>Organisme de formation</Link></li>
            <li><Link to="/trainee-practical-life" className='nav-link'>Vie pratique du stagiaire</Link></li>
            {isAuthenticated && isAdmin && (
              <li><Link to="/users" className='nav-link'>Utilisateurs</Link></li>
            )}
            <li><Link to="/contact" className='nav-link'>Contact</Link></li>
            {!isAuthenticated && (
              <li className='nav-link'>
                <button className="primary-button" onClick={() => navigateTo('/login')}>Se connecter</button>
              </li>
            )}
            {isAuthenticated && (
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
            )}
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
