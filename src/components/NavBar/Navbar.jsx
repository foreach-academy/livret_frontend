import React, { useContext, useEffect, useState } from 'react';
import '../../styles/NavBar/Navbar.css'; 
import logo from '../../assets/images/ForEach_hor_white.png';
import AuthContext from '../../Context/AuthContext';
import UserServices from '../../Services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, setToken} = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const navigateTo = (route) => {
      navigate(route);
      window.scrollTo(0,0);
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfilDropdown = () => {
    document.querySelector(".dropdown-profil-content").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-profil-button')) {
      const dropdowns = document.getElementsByClassName("dropdown-profil-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  // Deconnexion
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setToken(null);
    UserServices.logout();
    navigateTo('/')
    toast.success("Vous êtes déconnecté")
  }

  useEffect(()=> {
    
  }, [isAuthenticated, isAdmin])

  return (
    <header>
      <div className="container">
        <div className="logo">
          <a href="/">
            <img
              src={logo} 
              alt="MonLogo"
              className="logo-image"
            />
          </a>
        </div>
        <nav>
          <ul className="nav-links">
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                onClick={toggleDropdown}
              >
                Livret de suivi
              </a>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><a href="#">Mastère Architecte Web</a></li>
                  <li><a href="#">Assistant Ressources Humaines (ARH)</a></li>
                  <li><a href="#">Concepteur Développeur d'Application (CDA)</a></li>
                </ul>
              )}
            </li>
            <li><a href="#">Organisme de formation</a></li>
            <li><a href="#">Vie pratique du stagiaire</a></li>
            {isAuthenticated && isAdmin && <>
              <li><a href="/users">Utilisateurs</a></li>
            </>}
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        {!isAuthenticated && <>
          <a href='/login' className="cta">Se connecter</a>
        </>}
        {isAuthenticated && <>
          <div className="dropdown-profil">
            <div onClick={toggleProfilDropdown} className="dropdown-profil-button"><span className="material-icons-outlined">account_circle</span>Profil</div>
            <div id="myDropdown" className="dropdown-profil-content">
              <div className="dropdown-profil-content-flex" onClick={logout}>
                <span className="material-icons-outlined">logout</span>
                <span>Se déconnecter</span>
              </div>
            </div>
          </div>
        </>}
      </div>
    </header>
  );
};

export default Navbar;
