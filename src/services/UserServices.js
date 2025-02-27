import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthenticateService from "./AuthenticateServices";

class UserServices {

    /**
     * Récupère la liste complète de tous les utilisateurs.
     * @returns {Promise} - Promesse contenant les données de tous les utilisateurs.
     */
    static async fetchAllUsers(setUsers) {
        try {
            return await axios.get(process.env.REACT_APP_API_URL + '/users').then((response) => setUsers(response.data));
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw error;
        }
    }

    /**
     * Récupère les informations d'un utilisateur spécifique par son ID.
     * @param {number} id - L'identifiant de l'utilisateur.
     * @returns {Promise} - Promesse contenant les données de l'utilisateur.
     */
    static fetchUserById(id) {
        return axios.get(process.env.REACT_APP_API_URL + "/users/" + id);
    }

    /**
     * Ajoute un nouvel utilisateur.
     * @param {Object} users - Objet contenant les informations de l'utilisateur.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static addUser(user) {
        return axios.post(process.env.REACT_APP_API_URL + '/users', user)
    }

    /**
     * Récupère les utilisateurs associés à un rôle spécifique.
     * @param {string} roleName - Nom du rôle à rechercher.
     * @returns {Promise} - Promesse contenant les données des utilisateurs correspondant.
     */
    static getUserByRole(roleName) {
        return axios.get(`${process.env.REACT_APP_API_URL}/users/role/${roleName}`);
    }

    /**
     * Met à jour le rôle d'un utilisateur.
     * @param {number} id - ID de l'utilisateur.
     * @param {number} roleId - ID du nouveau rôle.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static UpdateUser(id, user) {
        return axios.patch(`${process.env.REACT_APP_API_URL}/users/${id}`, user);
    }

    /**
     * Supprime un utilisateur.
     * @param {number} id - ID de l'utilisateur.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static deleteUser(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);
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
            UserServices.setAxiosToken(token); // Actualise le token dans les headers axios
        } else {
            AuthenticateService.logout(); // Déconnecte si le token est invalide
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
     * Vérifie si l'utilisateur authentifié est un formateur.
     * @returns {boolean} - Vrai si l'utilisateur a un rôle "Formateur", faux sinon.
     */
    static isTrainer() {
        if (UserServices.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            const { role } = jwtDecode(token); // Décodage pour extraire le rôle
            return role === "Formateur"; // Vérifie si le rôle est "Formateur"
        }
        return false;
    }
    /**
     * Récupère le nom de l'utilisateur à partir du token JWT.
     * @returns {string} - Le nom de l'utilisateur.
     */
    static userName() {
        if (UserServices.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            const tokenData = jwtDecode(token);
            return tokenData.username;
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
    /**
     * Récupère les utilisateurs à partir du rôle
       */
    static getUserByRole(role) {
        return axios.get(`${process.env.REACT_APP_API_URL}/users/role/${role}`);
    }

}

export default UserServices;
