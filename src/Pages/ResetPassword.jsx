import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation pour récupérer le token dans l'URL
import UserServices from '../Services/UserServices';
import { toast } from 'react-toastify';
import "../styles/ResetPassword/ResetPassword.css";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [token, setToken] = useState(''); // Pour stocker le token
    const navigate = useNavigate();
    const location = useLocation(); // Hook pour récupérer l'URL

    // Récupérer le token de l'URL dès que le composant est monté
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token'); // On récupère le token de l'URL
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            console.log("Token récupéré :", tokenFromUrl);
        } else {
            toast.error("Le token est manquant.");
            navigate("/login"); // Rediriger si aucun token n'est trouvé
        }
    }, [location, navigate]);

    // Fonction de validation du mot de passe (10 caractères, 1 majuscule, 1 caractère spécial)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{10,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation lors de la soumission
        if (!validatePassword(newPassword)) {
            setPasswordError("Le mot de passe doit contenir au moins 10 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            // Si toutes les validations passent, réinitialisation des erreurs
            setPasswordError('');
            
            // Appel du service pour mettre à jour le mot de passe avec le token
            await UserServices.UpdateUserByToken(newPassword, token); // Utilisation de la bonne méthode
            toast.success("Mot de passe mis à jour avec succès !");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue lors de la mise à jour du mot de passe.");
        }
    };
    return  <>
        <h1 class="title_Pages">Réinitialisation du mot de passe</h1>
        <div class='form_blue_contener'>
            <form class='form_blue' onSubmit={handleSubmit}>
                <label class="label_form_blue label_form_blue_resetP" id='target_labelNewPassword_resetP' htmlFor="input_password">Nouveau mot de passe</label>
                <input 
                    class="input_form_blue"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    id='input_password' 
                    type="password" 
                    required 
                />

                <label id="target_labelConfirm_resetP" class="label_form_blue label_form_blue_resetP" htmlFor="confirm_password">Confirmation du mot de passe</label>
                <input 
                    class="input_form_blue"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    id='confirm_password' 
                    type="password" 
                    required 
                />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                <button className='primary-button' id='target_buttonConfirmNewPassword' type="submit">Confirmer</button>
            </form>    
        </div>  
    </>    
    
}
export default ResetPassword;