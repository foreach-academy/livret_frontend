import React, { useContext, useRef, useState } from "react";
import "../styles/Login/Login.css";
import AuthContext from "../context/AuthContext";
import UserServices from "../services/UserServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FRONT_ADMIN_DASHBOARD, FRONT_FORGOT_PASSWORD, FRONT_HOME } from "../utils/frontUrl";
import AuthenticateService from "../services/AuthenticateServices";
import { formatRetryTime } from "../utils/timeFormat";
import Input from "../components/shared/form/Input";
import Header from "../components/shared/navbar/Header";
import { admin, trainer } from "../utils/roleList";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [timeLeft, setTimeLeft] = useState(null);
  const { setIsAuthenticated, setToken, setIsAdmin, setIsTrainer, setUserName } = useContext(AuthContext);
  const navigate = useNavigate();
  const countdownInterval = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(null)

  const login = async (e) => {
    e.preventDefault();
  
    try {
      const response = await AuthenticateService.login(user);
  
      if (response.data.token) {
        const token = response.data.token;
        UserServices.setAxiosToken(token);
        window.localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        setToken(token);
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.user);
        setIsAdmin(decodedToken.role === admin);
        setIsTrainer(decodedToken.role === trainer); // A changer vers un context role
        navigate(FRONT_HOME);
        toast.success(`${response.data.message}`);
      } else {
        toast.error("Aucun token fourni");
      }
    } catch (error) {
      console.error("Erreur Axios capturée :", error);
        if (error.retryAfter) {
            const retryAfterSeconds = parseInt(error.retryAfter, 10);
            startCountdown(retryAfterSeconds);
          } 
    }
  };
  
  

  const startCountdown = (duration) => {
    if (countdownInterval.current) clearInterval(countdownInterval.current); 
    setTimeLeft(duration);
  
    countdownInterval.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval.current);
          countdownInterval.current = null; 
          return null; 
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  return (
    <>
      <Header setHeaderHeight={setHeaderHeight}/>
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
          <div className="login-form">
            <h2 className="connexion-title">Connexion</h2>
              <form><div className="form-group">
            
              <Input
                labelName="Email"
                type="email"
                value={user.email}
                changeFunction={(e) => setUser((prevState) => ({ ...prevState, email: e.target.value }))}
                className="color-white-text"
              />
            </div>
            <div className="form-group">
              <Input
                labelName="Mot de passe"
                type="password"
                value={user.password}
                changeFunction={(e) => setUser((prevState) => ({ ...prevState, password: e.target.value }))}
                className="color-white-text"
              />
              {timeLeft !== null && timeLeft > 0 && (
                <p className="security_error">
                  Veuillez patienter encore {formatRetryTime(timeLeft)} avant de réessayer.
                </p>
              )}
              <Link to={FRONT_FORGOT_PASSWORD} className="p-forgot">Mot de passe oublié / Première Connexion</Link>
            </div>
            <button id="button_login"   type="form" onClick={login}>Connexion</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
