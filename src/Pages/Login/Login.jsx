import React, { useContext, useState } from 'react';
import '../../styles/Login/Login.css';
import AuthContext from '../../Context/AuthContext';
import UserServices from '../../Services/UserServices';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setIsAuthenticated, setToken } = useContext(AuthContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("L'email saisi est invalide");
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError('Le champ mot de passe est invalide, il doit contenir au moins 8 caractères avec au moins 1 chiffre et 1 caractère spécial');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email) && validatePassword(password)) {
        try {
            const user = { email, password };
            const response = await UserServices.login(user);
            console.log(user);
            console.log(response.data.token);
            if (response.data.token) {
                UserServices.setAxiosToken(response.data.token);
                window.localStorage.setItem('authToken', response.data.token);
                setIsAuthenticated(true);
                setToken(response.data.token);
                console.log('Connexion réussie');
            } else {
                console.error('Erreur : aucun token dans la réponse');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    } else {
        console.error('Validation échouée');
    }
  };

  return (
    <>
      <div className="page-title">
        <h1>Bienvenue sur votre plateforme de suivi</h1>
      </div>
      <div className="page-container">
        <div>
          <ul className="plateform-list">
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
            <button id='button_login' type="submit" disabled={!validateEmail(email) || !validatePassword(password)}>
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
