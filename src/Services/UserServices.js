import axios from "axios";
import { URL } from './config';
import { jwtDecode } from "jwt-decode";

class UserServices {
    
    /**
     * Récupère la liste complète de tous les utilisateurs.
     * @returns {Promise} - Promesse contenant les données de tous les utilisateurs.
     */
    static async fetchAllUser() {
        try {
            return await axios.get(URL + '/users');
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw error; // Relance l'erreur pour un traitement ultérieur
        }
    }

    /**
     * Récupère les informations d'un utilisateur spécifique par son ID.
     * @param {number} id - L'identifiant de l'utilisateur.
     * @returns {Promise} - Promesse contenant les données de l'utilisateur.
     */
    static fetchUserById(id) {
        return axios.get(URL + "/users/" + id);
    }

    /**
     * Ajoute un nouvel utilisateur.
     * @param {Object} users - Objet contenant les informations de l'utilisateur.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static addUser(users) {
        return axios.post(URL + '/users', users);
    }

    /**
     * Récupère les utilisateurs associés à un rôle spécifique.
     * @param {string} roleName - Nom du rôle à rechercher.
     * @returns {Promise} - Promesse contenant les données des utilisateurs correspondant.
     */
    static getUserByRole(roleName) {
        return axios.get(`${URL}/users/role/${roleName}`);
    }

    /**
     * Met à jour le rôle d'un utilisateur.
     * @param {number} id - ID de l'utilisateur.
     * @param {number} roleId - ID du nouveau rôle.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static UpdateUser(id, roleId) {
        return axios.patch(`${URL}/users/update/${id}`, { role_id: roleId });
    }

    /**
     * Met à jour le mot de passe d'un utilisateur en utilisant un token de réinitialisation.
     * @param {string} newPassword - Nouveau mot de passe.
     * @param {string} token - Jeton de réinitialisation du mot de passe.
     * @returns {Promise} - Promesse contenant les données de la réponse du serveur.
     */
    static async UpdateUserByToken(newPassword, token) {
        try {
            const response = await axios.post(`${URL}/users/reset-password`, {
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
            const response = await axios.post(`${URL}/authenticate/login`, user);
            return response; // Retourne la réponse si la connexion est réussie
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429) { // Trop de tentatives de connexion
                    const retryAfter = error.response.headers['retry-after']; // Récupère le temps d'attente en secondes
                    const minutes = Math.floor(retryAfter / 60);// Convertit en minutes
                    const seconds = retryAfter % 60; // Récupère les secondes restantes
                    console.log(`login : il reste ${minutes} minutes et ${seconds} seconde(s)`);
                    throw { message: `Trop de tentatives. Veuillez réessayer dans ${minutes} minute(s) et ${seconds} seconde(s).`, retryAfter: retryAfter };
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

    /**
     * Définit le token JWT dans les headers d'axios pour les futures requêtes authentifiées.
     * @param {string} token - Jeton JWT de l'utilisateur.
     */
    static setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    /**
     * Vérifie si l'utilisateur est authentifié en testant l'expiration du token.
     * @returns {boolean} - Vrai si l'utilisateur est authentifié, faux sinon.
     */
    static isAuthenticated() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            try {
                const { exp: expiration } = jwtDecode(token);
                return expiration * 1000 > new Date().getTime(); // Vérifie si le token est expiré
            } catch (error) {
                console.error("Erreur lors du décodage du token JWT:", error);
                return false;
            }
        }
        return false;
    }

    /**
     * Vérifie et actualise l'état d'authentification de l'utilisateur en utilisant le token stocké.
     */
    static checkToken() {
        if (UserServices.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            const decoded = jwtDecode(token);
            UserServices.setAxiosToken(token); // Actualise le token dans les headers axios
        } else {
            UserServices.logout(); // Déconnecte si le token est invalide
        }
    }

    /**
     * Vérifie si l'utilisateur authentifié est un administrateur.
     * @returns {boolean} - Vrai si l'utilisateur a un rôle "Admin", faux sinon.
     */
    static isAdmin() {
        if (UserServices.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            const { role } = jwtDecode(token); // Décodage pour extraire le rôle
            return role === "Admin"; // Vérifie si le rôle est "Admin"
        }
        return false;
    }

    /**
     * Récupère l'ID de l'utilisateur à partir du token JWT.
     * @returns {number} - L'ID de l'utilisateur.
     */
    static getUserId() {
        const token = window.localStorage.getItem("authToken");
        const tokenData = jwtDecode(token);
        return tokenData.id;
    }
}

export default UserServices;
