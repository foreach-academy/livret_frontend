import apiClient from "../utils/apiClient"; // Importe apiClient pour centraliser les requêtes HTTP
import { FRONT_LOGIN } from "../utils/frontUrl";

class AuthenticateService {
    /**
     * Met à jour le mot de passe d'un utilisateur en utilisant un token de réinitialisation.
     * @param {string} newPassword - Nouveau mot de passe.
     * @param {string} token - Jeton de réinitialisation du mot de passe.
     * @returns {Promise} - Promesse contenant les données de la réponse du serveur.
     */
    static async resetPassword(newPassword, token) {
        try {
            const response = await apiClient.post('/authenticate/reset-password', {
                password: newPassword,
                token: token
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe avec le token:', error);
        }
    }

    /**
     * Authentifie un utilisateur et gère les erreurs en cas de tentatives multiples.
     * @param {Object} user - Objet contenant les informations d'identification de l'utilisateur.
     * @returns {Promise} - Promesse contenant la réponse du serveur si la connexion réussit.
     * @throws - Erreur avec un message explicatif en cas de tentative multiple ou d'autre problème.
     */
    static async login(user) {
        try {
            const response = await apiClient.post('/authenticate/login', user);
            return response; 
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429) { 
                    const retryAfter = error.response.headers['retry-after']; 
                    const minutes = Math.floor(retryAfter / 60); 
                    const seconds = retryAfter % 60; 

                    throw { message: `Trop de tentatives. Veuillez réessayer dans ${minutes} minute(s) et ${seconds} seconde(s).`, retryAfter: retryAfter };
                }
                throw { message: error.response.data.message || 'Erreur lors de la connexion.', error };
            } else if (error.request) {
                throw { message: 'Aucune réponse du serveur. Veuillez réessayer plus tard.' };
            } else {
                throw { message: 'Erreur lors de la tentative de connexion.', error };
            }
        }
    }

    /**
     * Déconnecte l'utilisateur en supprimant le token JWT du stockage local et des headers d'apiClient.
     */
    static logout() {
        window.localStorage.removeItem("authToken"); // Supprime le token JWT
        delete apiClient.defaults.headers["Authorization"];
    }

    /**
     * Envoi un mail de récupération de mot de passe 
     * 
     */
    static async sendForgotPasswordMail(email, navigate) {
        try {
            await apiClient.post('/emails/request-password-reset',  email );
            navigate(FRONT_LOGIN)
        } catch (error) {
            console.error('Erreur lors de l\'envoi du mail de récupération:', error);
        }
    }
}

export default AuthenticateService;
