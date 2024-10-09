import React, { useContext, useState } from 'react';
import '../../styles/Login/Login.css';
import AuthContext from '../../Context/AuthContext';
import UserServices from '../../Services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setIsAuthenticated, setToken, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateTo = (route) => {
      navigate(route);
      window.scrollTo(0,0);
  }

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
    // Réinitialiser l'erreur lors de la modification de l'email
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Réinitialiser l'erreur lors de la modification du mot de passe
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validation de l'email
    if (!validateEmail(email)) {
      setEmailError("L'email saisi est invalide");
      isValid = false;
    }

    // Validation du mot de passe
    if (!validatePassword(password)) {
      setPasswordError('Mot de passe invalide, au moins 10 caractères, 1 chiffre et 1 caractère spécial');
      isValid = false;
    }

    if (!isValid) {
      return; // Si la validation échoue, ne pas soumettre le formulaire
    }

    try {
      const user = { email, password };
      const token = await UserServices.login(user);
      if (token.data.token) {
        UserServices.setAxiosToken(token.data.token);
        window.localStorage.setItem('authToken', token.data.token);
        setIsAuthenticated(true);
        setToken(token.data.token);
        const decodedToken = jwtDecode(token.data.token);
        setIsAdmin(decodedToken.role === "Admin");     
        navigateTo('/');
        toast.success('Connexion réussie');
      } else {
        toast.error('Aucun token fourni');
        console.error('Erreur : aucun token dans la réponse');
      }
    } catch (error) {
      toast.error('Adresse email ou Mot de passe invalide');
      console.error('Erreur lors de la connexion :', error);
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
              <p className="p-forgot">Mot de passe oublié?</p>
            </div>
            <button id='button_login' type="submit">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
