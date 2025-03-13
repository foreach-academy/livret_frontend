import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/ResetPassword/ResetPassword.css";
import { validatePassword } from "../utils/validators";
import { FRONT_LOGIN } from "../utils/frontUrl";
import AuthenticateService from "../services/AuthenticateServices";
import Header from "../components/shared/navbar/Header";
import Input from "../components/shared/form/Input";
import Button from "../components/shared/Button";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = useState(null);

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
      <Header setHeaderHeight={setHeaderHeight} />
      <h1 className="d-flex justify-content-center mt-5">Création de votre mot de passe</h1>
      <span className="d-flex justify-content-center">Veuillez créer un mot de passe que vous utiliserez pour accéder à votre compte.</span>
      <div className="form_blue_contener bg-fe-blue">
        <div className="form_blue">

          <Input
            labelName="Mot de passe"
            type="password"
            changeFunction={(e) => setNewPassword(e.target.value)}
            className="w-100"
          />
          <Input
            labelName="Confirmation du mot de passe"
            type="password"
            changeFunction={(e) => setConfirmPassword(e.target.value)}
            className="w-100"
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <Button 
          className="bg-fe-orange w-100 mt-4"
          buttonTitle="Confirmer"
          setAction={() => {
            resetPassword()
          }}
          />
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
