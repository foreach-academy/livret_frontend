import React, { useState } from 'react';
import './Navbar.css'; 
import logo from './assets/images/ForEach_hor_white.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <a href="#">
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
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <a className="cta" href="#">Se connecter</a>
      </div>
    </header>
  );
};

export default Navbar;
