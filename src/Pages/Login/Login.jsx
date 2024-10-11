import React, { useContext, useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  // New state for disabling button
  const { setIsAuthenticated, setToken, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{10,}$/;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      toast.error('Adresse email ou Mot de passe invalide');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event) => {
    if (event.target.id === 'myModal') closeModal();
  };

  const HandleModalSubmit = async () => {
    setIsSubmitting(true);  // Disable the button on submit
    try {
      await EmailServices.resetPasswordEmail(email);
      toast.success('Email de réinitialisation envoyé');
      closeModal();
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email');
    } finally {
      setIsSubmitting(false);  // Re-enable the button after sending
    }
  }

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
              <p className="p-forgot" onClick={openModal}>Mot de passe oublié?</p>
            </div>
            <button id='button_login' type="submit">
              Se connecter
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
                </div>
                <div className="modal-footer">
                  <button id='button_form_sendMail' onClick={HandleModalSubmit} disabled={isSubmitting} className='button_sendMail button_list'>
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