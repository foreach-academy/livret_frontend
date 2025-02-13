import React, { useContext, useState, useEffect } from "react";
import "../styles/Login/Login.css";
import AuthContext from "../context/AuthContext";
import UserServices from "../services/UserServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EmailServices from "../services/EmailServices";
import { jwtDecode } from "jwt-decode";
import { FRONT_ADMIN_DASHBOARD, FRONT_HOME } from "../utils/frontUrl";
import AuthenticateService from "../services/AuthenticateServices";
import Modal from "../components/shared/modal/Modal";
import ModalFooter from "../components/shared/modal/ModalFooter";
import ModalHeader from "../components/shared/modal/ModalHeader";
import ModalBody from "../components/shared/modal/ModalBody";
import EmailInput from "../components/shared/form/EmailInput";
import { formatRetryTime } from "../utils/timeFormat";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [emailForPasswordReset, setEmailForPasswordReset] = useState("");
  const [retryTimeLeftLogin, setRetryTimeLeftLogin] = useState(null);
  const [retryTimeLeftEmail, setRetryTimeLeftEmail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsAuthenticated, setToken, setIsAdmin, setIsTrainer } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fonction de gestion du formulaire de connexion
  const login = async (e) => {
    if (retryTimeLeftLogin) {
      toast.error(
        `Veuillez attendre ${formatRetryTime(retryTimeLeftLogin)} avant de réessayer.`
      );
      return;
    }
  
    try {
      const response = await AuthenticateService.login(user);
      
      if (response.data.token) {
        // Stocker le token et le décoder immédiatement
        const token = response.data.token;
        UserServices.setAxiosToken(token);
        window.localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        setToken(token);
        
        // Décoder le token pour vérifier le rôle de l'utilisateur
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === "Admin");
        setIsTrainer(decodedToken.role === "Formateur");
  
        // Redirection en fonction du rôle
        if (decodedToken.role === "Admin" || decodedToken.role === "Formateur") {
          navigate(FRONT_ADMIN_DASHBOARD);
        } else {
          navigate(FRONT_HOME);
        }
  
        toast.success(`${response.data.message}`);
        setRetryTimeLeftLogin(null);
      } else {
        toast.error("Aucun token fourni");
      }
    } catch (error) {
      if (error.retryAfter) {
        const retryTime = parseInt(error.retryAfter, 10);
        if (!isNaN(retryTime)) {
          setRetryTimeLeftLogin(retryTime); // Met à jour le délai de réessai
          toast.error(
            `Veuillez attendre ${formatRetryTime(retryTime)} avant de réessayer.`
          );
        } else {
          toast.error("Erreur lors de la connexion.");
        }
      } else {
        toast.error("Erreur lors de la connexion.");
      }
    }
  };
  

  const resetPassword = async () => {
    if (retryTimeLeftEmail) {
      toast.error(
        `Veuillez attendre ${formatRetryTime(
          retryTimeLeftEmail
        )} avant de réessayer.`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await EmailServices.resetPasswordEmail(emailForPasswordReset);
      toast.success("Email de réinitialisation envoyé");
      setIsModalOpen(false)
      setRetryTimeLeftEmail(null);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = parseInt(error.response.headers["retry-after"], 10);
        if (!isNaN(retryAfter)) {
          setRetryTimeLeftEmail(retryAfter);
          toast.error(
            `Veuillez attendre ${formatRetryTime(
              retryAfter
            )} avant de réessayer.`
          );
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
    
    return () => clearInterval(countdown);
  }, [retryTimeLeftLogin, retryTimeLeftEmail]);

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
          <div className="login-form">
            <h2 className="connexion-title">Connexion</h2>
            <div className="form-group">
              <input
                className="input_login"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => {
                  setUser((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }));
                  setErrors((prevState) => ({
                    ...prevState,
              
                  }));
                }}
                required
                placeholder="Email"
              />
              <br />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <input
                className="input_login"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => {
                  setUser((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                  setErrors((prevState) => ({
                    ...prevState,
                  }));
                }}
                required
                placeholder="Mot de passe"
              />
              <br />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
              {/* Affichage conditionnel du message de temps d'attente */}
              {retryTimeLeftLogin !== null && (
                <p className="errorSécurité">
                  Veuillez attendre {formatRetryTime(retryTimeLeftLogin)} avant
                  de réessayer.
                </p>
              )}
              <p className="p-forgot" onClick={() => {setIsModalOpen(true)}}>
                Mot de passe oublié?
              </p>
            </div>
            <button
              id="button_login"
              disabled={isSubmitting}
              onClick={() => {
                login();
              }}
            >
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </button>
          </div>
          {isModalOpen && (
            <Modal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            >
              <ModalHeader
                modalHeaderTitle="Reinitialiser le Mot de Passe"
                modalHeaderAction={setIsModalOpen}
              />
              <ModalBody>
                <EmailInput
                  label="Email"
                  inputValue={emailForPasswordReset}
                  inputAction={setEmailForPasswordReset}
                  retryTime={retryTimeLeftEmail}
                />
              </ModalBody>
              <ModalFooter
                button
                buttonAction={resetPassword}
                isSubmitting={isSubmitting}
                retryTimeLeftEmail={retryTimeLeftEmail}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
