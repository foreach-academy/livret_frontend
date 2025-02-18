import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/ResetPassword/ResetPassword.css";
import { validatePassword } from "../utils/validators";
import { FRONT_LOGIN } from "../utils/frontUrl";
import AuthenticateService from "../services/AuthenticateServices";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const tokenFromUrl = useParams()


  const resetPassword = async (e) => {
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 10 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await AuthenticateService.resetPassword(newPassword, tokenFromUrl.token);
      toast.success("Mot de passe mis à jour avec succès !");
      navigate(FRONT_LOGIN, navigate);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
    }
  };

  return (
    <>
      <h1 className="title_Pages">Réinitialisation du mot de passe</h1>
      <div className="form_blue_contener">
        <div className="form_blue">
          <label
            id="target_labelNewPassword_resetP"
            className="label_form_blue label_form_blue_resetP"
            htmlFor="input_password"
          >
            Nouveau mot de passe
          </label>
          <input
            className="input_form_blue"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="input_password"
            type="password"
            required
          />

          <label
            id="target_labelConfirm_resetP"
            className="label_form_blue label_form_blue_resetP"
            htmlFor="confirm_password"
          >
            Confirmation du mot de passe
          </label>
          <input
            className="input_form_blue"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirm_password"
            type="password"
            required
          />
          {/* Affichage du message d'erreur de validation de mot de passe */}
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

          <button
            id="target_buttonConfirmNewPassword"
            className="primary-button"
            onClick={() => {
              resetPassword();
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
