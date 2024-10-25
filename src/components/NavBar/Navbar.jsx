import React, { useContext, useEffect, useState } from 'react'; 
// Importe React, ainsi que les hooks useContext, useEffect et useState
import '../../styles/NavBar/Navbar.css'; // Importe le fichier CSS pour styliser la barre de navigation
import logo from '../../assets/images/ForEach_hor_white.png'; // Importe le logo de l'application
import AuthContext from '../../Context/AuthContext'; // Importe le contexte d'authentification
import UserServices from '../../Services/UserServices'; // Importe les services pour la gestion des utilisateurs
import { toast } from 'react-toastify'; // Importe la bibliothèque pour les notifications
import { useNavigate, Link } from 'react-router-dom'; // Importe les hooks de navigation et le composant Link de React Router
import DOMPurify from 'dompurify'; // Importe DOMPurify pour sécuriser les URLs

// Composant fonctionnel Navbar
const Navbar = () => {
  // Accède au contexte d'authentification pour gérer l'état d'authentification et les droits d'administrateur
  const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, setToken } = useContext(AuthContext);
  // État pour contrôler l'affichage du menu déroulant (dropdown)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // État pour contrôler l'affichage du menu hamburger en mode mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Utilisé pour la navigation

  // Fonction pour naviguer vers une route spécifique et défiler en haut de la page
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  // Bascule l'état du menu déroulant
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Bascule l'affichage du dropdown de profil
  const toggleProfilDropdown = (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement au parent
    document.querySelector(".dropdown-profil-content").classList.toggle("show"); // Bascule la classe "show" pour afficher ou masquer
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setIsAuthenticated(false); // Désactive l'état authentifié
    setIsAdmin(false); // Désactive les droits d'admin
    setToken(null); // Réinitialise le token
    UserServices.logout(); // Appelle le service de déconnexion pour les opérations nécessaires
    navigateTo('/'); // Redirige vers la page d'accueil
    toast.success("Vous êtes déconnecté"); // Affiche une notification de succès
  };

  // Effet pour gérer l'ouverture et la fermeture du menu hamburger en mode mobile
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger"); // Sélectionne l'élément hamburger
    const navLink = document.querySelectorAll(".nav-link"); // Sélectionne tous les liens de navigation
    const hamburgerIcon = document.querySelector(".hamburger .material-icons-outlined"); // Sélectionne l'icône hamburger

    // Fonction pour basculer l'état d'ouverture du menu mobile
    const mobileMenu = () => {
      setIsMenuOpen(prevState => !prevState); // Inverse l'état actuel de isMenuOpen
      if (!isMenuOpen) {
        hamburgerIcon.innerText = "close"; // Affiche "close" quand le menu est ouvert
      } else {
        hamburgerIcon.innerText = "menu"; // Affiche "menu" quand le menu est fermé
      }
    };

    // Fonction pour fermer le menu mobile
    const closeMenu = () => {
      setIsMenuOpen(false); // Ferme le menu
      hamburgerIcon.innerText = "menu"; // Réinitialise l'icône
    };

    hamburger.addEventListener("click", mobileMenu); // Ajoute un écouteur d'événement sur le hamburger pour basculer le menu
    navLink.forEach(n => n.addEventListener("click", closeMenu)); // Ajoute un écouteur de clic sur chaque lien pour fermer le menu

    return () => {
      // Nettoie les écouteurs d'événements lors du démontage du composant
      hamburger.removeEventListener("click", mobileMenu);
      navLink.forEach(link => {
        link.removeEventListener("click", closeMenu);
      });
    }
  }, [isMenuOpen]); // Dépendance à isMenuOpen, l'effet se déclenchera à chaque changement de cet état

  // Fonction pour sécuriser les URLs
  const sanitizeUrl = (url) => {
    const allowedUriRegexp = new RegExp('^(https?://[^\s]+)$'); // Expression régulière pour vérifier une URL autorisée
    return DOMPurify.sanitize(url, { ALLOWED_URI_REGEXP: allowedUriRegexp }); // Sanitize l'URL pour éviter les injections malveillantes
  };

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <Link to="/"> {/* Logo cliquable pour revenir à la page d'accueil */}
              <img src={logo} alt="Logo Foreach Academy" className="logo-image" /> {/* Image du logo */}
            </Link>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}> {/* Affiche le menu avec une classe active si le menu mobile est ouvert */}
            {isAuthenticated && <>
              <li className="dropdown" onClick={toggleDropdown}> {/* Item de menu avec un sous-menu */}
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  <span>Livrets de suivi </span>
                  <span className="material-icons-outlined">expand_more</span> {/* Icône d'extension pour le dropdown */}
                </div>
                {dropdownOpen && ( // Affiche le dropdown si dropdownOpen est true
                  <ul className="dropdown-menu">
                    <li className='nav-link'><a href="/formation/1/students">Assistant Ressources Humaines (ARH)</a></li>
                    <li className='nav-link'><a href="/formation/2/students">Concepteur Développeur d'Application (CDA)</a></li>
                    <li className='nav-link'><a href="/formation/3/students">Mastère Architecte Web</a></li>
                  </ul>
                )}
              </li>
              <li><Link to="/trainer-practical-life" className='nav-link'>Vie pratique du stagiaire</Link></li> {/* Lien vers vie pratique du stagiaire */}
            </>}
            {isAuthenticated && isAdmin && <>
              <li><Link to="/users" className='nav-link'>Utilisateurs</Link></li> {/* Lien vers la gestion des utilisateurs pour l'admin */}
            </>}
            {isAuthenticated && <>
              <li><Link to="/contact" className='nav-link'>Contact</Link></li> {/* Lien vers la page contact */}
              <li>
                <div className="dropdown-profil">
                  <div onClick={toggleProfilDropdown} className="dropdown-profil-button">
                    <span className="material-icons-outlined">account_circle</span>Profil {/* Bouton de profil avec icône */}
                  </div>
                  <ul id="myDropdown" className="dropdown-profil-content"> {/* Sous-menu pour le profil */}
                    <li className="dropdown-profil-content-flex nav-link" onClick={logout}>
                      <span className="material-icons-outlined">logout</span>
                      <span>Se déconnecter</span> {/* Option pour se déconnecter */}
                    </li>
                  </ul>
                </div>
              </li>
            </>}
          </ul>
          <div className='hamburger'> {/* Icône de menu hamburger pour les petits écrans */}
            <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span> {/* Affiche 'close' ou 'menu' en fonction de l'état */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; // Exporte le composant Navbar