import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import UserServices from '../Services/UserServices';
import { toast } from 'react-toastify';
import "../styles/ResetPassword/ResetPassword.css";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [token, setToken] = useState(''); 
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token'); 
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            toast.error("Le token est manquant.");
            navigate("/login"); 
        }
    }, [location, navigate]);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]{10,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(newPassword)) {
            setPasswordError("Le mot de passe doit contenir au moins 10 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            setPasswordError(''); // Réinitialisation des erreurs
            // Appel du service pour mettre à jour le mot de passe
            await UserServices.UpdateUserByToken(newPassword, token);
            toast.success("Mot de passe mis à jour avec succès !");
            navigate("/login"); // Redirection après succès
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe :", error);
            toast.error("Une erreur est survenue lors de la mise à jour du mot de passe.");
        }
    };

    return (
        <>
            <h1 className="title_Pages">Réinitialisation du mot de passe</h1>
            <div className='form_blue_contener'>
                <form className='form_blue' onSubmit={handleSubmit}>
                    <label id='target_labelNewPassword_resetP' className="label_form_blue label_form_blue_resetP" htmlFor="input_password">
                        Nouveau mot de passe
                    </label>
                    <input 
                        className="input_form_blue"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        id='input_password' 
                        type="password" 
                        required 
                    />

                    <label id='target_labelConfirm_resetP' className="label_form_blue label_form_blue_resetP" htmlFor="confirm_password">
                        Confirmation du mot de passe
                    </label>
                    <input 
                        className="input_form_blue"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        id='confirm_password' 
                        type="password" 
                        required 
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                    <button id='target_buttonConfirmNewPassword' className='primary-button' type="submit">Confirmer</button>
                </form>    
            </div>  
        </>
    );
}

export default ResetPassword;
