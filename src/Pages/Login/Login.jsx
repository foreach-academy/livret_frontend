// Importation des bibliothèques nécessaires pour le composant
import React, { useContext, useState, useEffect } from 'react';
import '../../styles/Login/Login.css'; // Importation du fichier CSS pour les styles
import AuthContext from '../../Context/AuthContext'; // Contexte d'authentification global
import UserServices from '../../Services/UserServices'; // Service pour gérer les requêtes utilisateur
import { toast } from 'react-toastify'; // Pour afficher des notifications
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation
import EmailServices from "../../Services/EmailServices"; // Service pour envoyer des emails de réinitialisation
import { jwtDecode } from 'jwt-decode'; // Décodage de token JWT

// Composant de la page de connexion
const Login = () => {
  // État des champs d'email et de mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // État des messages d'erreur pour les champs
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // États pour la gestion des délais de réessai après plusieurs tentatives échouées
  const [retryTimeLeftLogin, setRetryTimeLeftLogin] = useState(null);
  const [retryTimeLeftEmail, setRetryTimeLeftEmail] = useState(null);
  // État pour ouvrir ou fermer la modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // État pour indiquer si une requête est en cours
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Contexte d'authentification pour mettre à jour l'état global
  const { setIsAuthenticated, setToken, setIsAdmin } = useContext(AuthContext);
  // Hook pour naviguer vers d'autres pages
  const navigate = useNavigate();

  // Fonction pour valider le format de l'email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction pour valider le format du mot de passe
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]{10,}$/;
    return passwordRegex.test(password);
  };

  // Gestion des changements dans le champ d'email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(''); // Réinitialise le message d'erreur
  };

  // Gestion des changements dans le champ de mot de passe
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(''); // Réinitialise le message d'erreur
  };

  // Utilisation d'un effet pour gérer le compte à rebours lors des délais de réessai
  useEffect(() => {
    let countdown;
    if (retryTimeLeftLogin || retryTimeLeftEmail) {
      countdown = setInterval(() => {
        // Décrémenter le délai de réessai pour chaque seconde
        setRetryTimeLeftLogin((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            return null;
          }
          return prevTime - 1;
        });
        setRetryTimeLeftEmail((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    // Nettoyage du compte à rebours
    return () => clearInterval(countdown);
  }, [retryTimeLeftLogin, retryTimeLeftEmail]);

  // Fonction pour formater le délai de réessai en minutes et secondes
  const formatRetryTime = (retryAfter) => {
    const minutes = Math.floor(retryAfter / 60);
    const seconds = retryAfter % 60;
    return `${minutes} minute(s) et ${seconds} seconde(s)`;
  };

  // Fonction de gestion du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Affiche un message d'erreur si un délai de réessai est en cours
    if (retryTimeLeftLogin) {
      toast.error(`Veuillez attendre ${formatRetryTime(retryTimeLeftLogin)} avant de réessayer.`);
      return;
    }

    // Validation des champs
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError("L'email saisi est invalide");
      isValid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('Mot de passe invalide, au moins 10 caractères, 1 chiffre et 1 caractère spécial');
      isValid = false;
    }
    if (!isValid) return;

    try {
      const user = { email, password }; // Objet utilisateur pour l'authentification
      const response = await UserServices.login(user); // Appel de la fonction de connexion
      if (response.data.token) { // Si connexion réussie
        UserServices.setAxiosToken(response.data.token); // Définit le token pour les requêtes
        window.localStorage.setItem('authToken', response.data.token); // Stocke le token localement
        setIsAuthenticated(true); // Met à jour l'état d'authentification
        setToken(response.data.token); // Enregistre le token dans le contexte
        navigate('/'); // Redirige vers la page d'accueil
        const decodedToken = jwtDecode(response.data.token); // Décode le token pour obtenir des informations
        setIsAdmin(decodedToken.role === "Admin"); // Définit l'utilisateur en tant qu'administrateur si le rôle est "Admin"
        toast.success('Connexion réussie');
        setRetryTimeLeftLogin(null); // Réinitialise le délai de réessai
      } else {
        toast.error('Aucun token fourni');
      }
    } catch (error) {
      // Réinitialise les champs en cas d'erreur
      setEmail('');
      setPassword('');
      // Gère les erreurs de délai de réessai ou les erreurs générales
      if (error.retryAfter) {
        const retryTime = parseInt(error.retryAfter, 10);
        if (!isNaN(retryTime)) {
          setRetryTimeLeftLogin(retryTime); // Met à jour le délai de réessai
          toast.error(`Veuillez attendre ${formatRetryTime(retryTime)} avant de réessayer.`);
        } else {
          toast.error("Erreur lors de la connexion.");
        }
      } else {
        toast.error("Erreur lors de la connexion.");
      }
    }
  };

  // Fonction pour ouvrir la modal de réinitialisation de mot de passe
  const openModal = () => setIsModalOpen(true);
  // Fonction pour fermer la modal
  const closeModal = () => setIsModalOpen(false);

  // Ferme la modal si un clic est effectué en dehors du contenu
  const handleClickOutside = (event) => {
    if (event.target.id === 'myModal') closeModal();
  };

  // Fonction de soumission du formulaire de réinitialisation de mot de passe dans la modal
  const HandleModalSubmit = async () => {
    if (retryTimeLeftEmail) {
      toast.error(`Veuillez attendre ${formatRetryTime(retryTimeLeftEmail)} avant de réessayer.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await EmailServices.resetPasswordEmail(email); // Envoie une requête pour réinitialiser le mot de passe
      toast.success('Email de réinitialisation envoyé');
      closeModal(); // Ferme la modal
      setRetryTimeLeftEmail(null); // Réinitialise le délai de réessai
    } catch (error) {
      // Gère les erreurs de délai de réessai ou les erreurs générales pour l'envoi d'email
      console.log("Erreur de réponse : ", error.response);
      if (error.response && error.response.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'], 10);
        if (!isNaN(retryAfter)) {
          setRetryTimeLeftEmail(retryAfter);
          toast.error(`Veuillez attendre ${formatRetryTime(retryAfter)} avant de réessayer.`);
        } else {
          toast.error("Erreur lors de l'envoi de l'email.");
        }
      } else {
        toast.error("Erreur lors de l'envoi de l'email.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendu de l'interface utilisateur
  return (
    <>
      <div className="page-title">
        <h1>Bienvenue sur votre plateforme de suivi</h1>
      </div>
      <div className="page-container">
        {/* Liste d'informations de la plateforme */}
        <div className="plateform-list">
          <ul>
            <li>Presentation et organisme de formation</li>
            <li>La formation & son programme</li>
            <li>Vie pratique du stagiaire</li>
            <li>La charte de confidentialité</li>
            <li>Suivi du stagiaire en centre de formation</li>
            <li>Suivi du stagiaire en entreprise</li>
            <li>Mode d'emploi</li>
          </ul>
        </div>

        {/* Formulaire de connexion */}
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className='connexion-title'>Connexion</h2>
            <div className="form-group">
              <input
                className='input_login'
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Email"
              />
              <br />
              {emailError && <span className="error">{emailError}</span>}
            </div>
            <div className="form-group">
              <input
                className='input_login'
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Mot de passe"
              />
              <br />
              {passwordError && <span className="error">{passwordError}</span>}
              {/* Affichage conditionnel du message de temps d'attente */}
              {retryTimeLeftLogin !== null && (
                <p className='errorSécurité'>Veuillez attendre {formatRetryTime(retryTimeLeftLogin)} avant de réessayer.</p>
              )}
              <p className="p-forgot" onClick={openModal}>Mot de passe oublié?</p>
            </div>
            <button id='button_login' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
          {isModalOpen && (
            <div id="myModal" className="modal" onClick={handleClickOutside}>
              <div className="modal-content">
                <div className="modal-header">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h2>Réinitialiser le mot de passe</h2>
                </div>
                <div className="modal-body"> 
                  <label id='label_email_send' htmlFor="email">Email</label>
                  <input type="email" id='input_modal_emailSend' value={email} readOnly />
                  {/* Affichage conditionnel du message de temps d'attente dans la modal */}
                  {retryTimeLeftEmail !== null && (
                    <p className='errorSécurité'>Veuillez attendre {formatRetryTime(retryTimeLeftEmail)} avant de réessayer.</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button id='button_form_sendMail' onClick={HandleModalSubmit} disabled={isSubmitting || retryTimeLeftEmail} className='button_sendMail button_list'>
                    {isSubmitting ? 'Envoi en cours...' : 'Valider'}
                  </button>
                </div>
              </div> 
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
