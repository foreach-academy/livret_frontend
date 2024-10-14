import React, { useContext, useState, useEffect } from 'react';
import '../../styles/Login/Login.css';
import AuthContext from '../../Context/AuthContext';
import UserServices from '../../Services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EmailServices from "../../Services/EmailServices";
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [retryTimeLeft, setRetryTimeLeft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // État pour désactiver le bouton
  const { setIsAuthenticated, setToken, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]{10,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  useEffect(() => {
    let countdown;
    if (retryTimeLeft) {
      countdown = setInterval(() => {
        setRetryTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [retryTimeLeft]);

  // Fonction pour convertir les secondes en minutes et secondes
  const formatRetryTime = (retryAfter) => {
    const minutes = Math.floor(retryAfter / 60); // Convertir les secondes en minutes
    const seconds = retryAfter % 60; // Récupérer les secondes restantes
    return `${minutes} minute(s) et ${seconds} seconde(s)`; // Format personnalisé
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (retryTimeLeft) {
      toast.error(`Veuillez attendre ${formatRetryTime(retryTimeLeft)} avant de réessayer.`);
      return;
    }

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
      const user = { email, password };
      const token = await UserServices.login(user);
      if (token.data.token) {
        UserServices.setAxiosToken(token.data.token);
        window.localStorage.setItem('authToken', token.data.token);
        setIsAuthenticated(true);
        setToken(token.data.token);
        navigate('/');
        const decodedToken = jwtDecode(token.data.token);
        setIsAdmin(decodedToken.role === "Admin");
        toast.success('Connexion réussie');     
      } else {
        toast.error('Aucun token fourni');
      }
    } catch (error) {
      console.log("Erreur lors de la connexion:", error);
      toast.error("Adresse Mail ou Mot de passe Incorrect");
      if (error.response && error.response.status === 429) {
        // Assurez-vous de vérifier si l'en-tête 'Retry-After' existe
        const retryAfter = parseInt(error.response.headers['retry-after']) || 60; // Default to 60 seconds if not present
        setRetryTimeLeft(retryAfter);
        toast.error(`Veuillez attendre ${formatRetryTime(retryAfter)} avant de réessayer.`);
      } else {
        toast.error(error.message || 'Erreur lors de la connexion.');
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event) => {
    if (event.target.id === 'myModal') closeModal();
  };

  const HandleModalSubmit = async () => {
    if (retryTimeLeft) {
      toast.error(`Veuillez attendre ${formatRetryTime(retryTimeLeft)} avant de réessayer.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await EmailServices.resetPasswordEmail(email);
      toast.success('Email de réinitialisation envoyé');
      closeModal();
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("bonjour");
        const retryAfter = parseInt(error.message.match(/\d+/)[0]);
        setRetryTimeLeft(retryAfter);
        toast.error(`Veuillez attendre ${formatRetryTime(retryAfter)} avant de réessayer.`);
      } else {
        toast.error("Erreur lors de l'envoi de l'email.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-title">
        <h1>Bienvenue sur votre plateforme de suivi</h1>
      </div>
      <div className="page-container">
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
              {retryTimeLeft !== null && (
                <p className='errorSécurité'>Veuillez attendre {formatRetryTime(retryTimeLeft)} avant de réessayer.</p>
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
                  <input type="email" id='input_modal_emailSend' value={email} readOnly/>
                  {/* Affichage conditionnel du message de temps d'attente dans la modal */}
                  {retryTimeLeft !== null && (
                    <p className='errorSécurité'>Veuillez attendre {formatRetryTime(retryTimeLeft)} avant de réessayer.</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button id='button_form_sendMail' onClick={HandleModalSubmit} disabled={isSubmitting || retryTimeLeft} className='button_sendMail button_list'>
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
