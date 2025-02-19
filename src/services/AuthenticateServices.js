import axios from "axios";

class AuthenticateService {
    /**
 * Met à jour le mot de passe d'un utilisateur en utilisant un token de réinitialisation.
 * @param {string} newPassword - Nouveau mot de passe.
 * @param {string} token - Jeton de réinitialisation du mot de passe.
 * @returns {Promise} - Promesse contenant les données de la réponse du serveur.
 */
    static async resetPassword(newPassword, token) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/authenticate/reset-password`, {
                password: newPassword,
                token: token
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe avec le token:', error);
            throw error;
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/authenticate/login`, user);
            return response; // Retourne la réponse si la connexion est réussie
        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 429) { // Trop de tentatives de connexion
                    const retryAfter = error.response.headers['retry-after']; // Récupère le temps d'attente en secondes
                    const minutes = Math.floor(retryAfter / 60);// Convertit en minutes
                    const seconds = retryAfter % 60; // Récupère les secondes restantes
                    console.log(`login : il reste ${minutes} minutes et ${seconds} seconde(s)`);
        
                    throw { message: `Trop de tentatives. Veuillez réessayer dans ${minutes} minute(s) et ${seconds} seconde(s).`, retryAfter: retryAfter};
                }
                // Autre erreur serveur avec réponse
                console.error('Erreur de réponse du serveur:', error.response.data);
                throw { message: error.response.data.message || 'Erreur lors de la connexion.' };
            } else if (error.request) {
                // Aucune réponse du serveur
                console.error('Aucune réponse du serveur:', error.request);
                throw { message: 'Aucune réponse du serveur. Veuillez réessayer plus tard.' };
            } else {
                // Erreur pendant la configuration de la requête
                console.error('Erreur lors de la configuration de la requête:', error.message);
                throw { message: 'Erreur lors de la tentative de connexion.' };
            }
        }
    }

    /**
     * Déconnecte l'utilisateur en supprimant le token JWT du stockage local et d'axios.
     */
    static logout() {
        window.localStorage.removeItem("authToken"); // Supprime le token JWT
        delete axios.defaults.headers["Authorization"];
    }
}

export default AuthenticateService