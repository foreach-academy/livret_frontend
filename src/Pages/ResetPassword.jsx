// Importation des bibliothèques nécessaires pour le composant
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import UserServices from '../Services/UserServices'; // Service pour les requêtes utilisateur
import { toast } from 'react-toastify'; // Pour afficher des notifications
import "../styles/ResetPassword/ResetPassword.css"; // Importation du fichier CSS

// Composant pour la réinitialisation du mot de passe
function ResetPassword() {
    // État pour le nouveau mot de passe et la confirmation
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // État pour le message d'erreur sur le mot de passe
    const [passwordError, setPasswordError] = useState('');
    // État pour stocker le token de réinitialisation
    const [token, setToken] = useState(''); 
    // Hooks pour la navigation et la gestion des paramètres d'URL
    const navigate = useNavigate();
    const location = useLocation(); 

    // Récupération du token depuis l'URL et stockage dans l'état
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token'); // Obtient le token
        if (tokenFromUrl) {
            setToken(tokenFromUrl); // Stocke le token dans l'état
        } else {
            // Si le token est absent, affiche une erreur et redirige vers la page de connexion
            toast.error("Le token est manquant.");
            navigate("/login"); 
        }
    }, [location, navigate]);

    // Fonction pour valider la complexité du mot de passe
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]{10,}$/;
        return passwordRegex.test(password);
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation de la complexité du mot de passe
        if (!validatePassword(newPassword)) {
            setPasswordError("Le mot de passe doit contenir au moins 10 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.");
            return;
        }

        // Vérifie si les mots de passe correspondent
        if (newPassword !== confirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            setPasswordError(''); // Réinitialise les messages d'erreur
            // Appel du service pour mettre à jour le mot de passe avec le token fourni
            await UserServices.UpdateUserByToken(newPassword, token);
            toast.success("Mot de passe mis à jour avec succès !");
            navigate("/"); // Redirection vers la page de connexion après succès
        } catch (error) {
            // Gestion des erreurs
            console.error("Erreur lors de la mise à jour du mot de passe :", error);
            toast.error("Une erreur est survenue lors de la mise à jour du mot de passe.");
        }
    };

    // Rendu de l'interface utilisateur
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
                    {/* Affichage du message d'erreur de validation de mot de passe */}
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                    <button id='target_buttonConfirmNewPassword' className='primary-button' type="submit">Confirmer</button>
                </form>    
            </div>  
        </>
    );
}

export default ResetPassword;
