import apiClient from "../utils/apiClient";
import apiClient from "../utils/apiClient";
import { jwtDecode } from "jwt-decode";
import AuthenticateService from "./AuthenticateServices";
import { admin } from "../utils/roleList";

class UserServices {
    /**
     * Récupère la liste complète de tous les utilisateurs.
     * @param {Function} setUsers - Fonction pour mettre à jour l'état des utilisateurs.
     * @returns {Promise} - Promesse contenant les données de tous les utilisateurs.
     */
    static async fetchAllUsers(setUsers) {
        try {
            const response = await apiClient.get('/users');
            const response = await apiClient.get('/users');
            setUsers(response.data);
            return response.data;
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
    static fetchUserById(id, setUser) {
        return apiClient.get(`/users/${id}`).then((response) => {
            setUser(response.data);
        });
    }

    /**
     * Ajoute un nouvel utilisateur.
     * @param {Object} user - Objet contenant les informations de l'utilisateur.
     * @param {Function} navigate - Fonction de navigation pour rediriger après l'ajout.
     * @param {Object} toast - Instance de notification pour afficher un message.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static addUser(user, navigate, toast) {
        try {
            const response = await apiClient.post('/users', user);
            navigate(-1);
            toast.success(`Utilisateur ${user.firstname} ajouté avec succès!`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Récupère les utilisateurs associés à un rôle spécifique.
     * @param {string} role - Nom du rôle à rechercher.
     * @returns {Promise} - Promesse contenant les données des utilisateurs correspondant.
     */
    static getUserByRole(role) {
        return apiClient.get(`/users/role/${role}`);
        return apiClient.get(`/users/role/${role}`);
    }

    /**
     * Met à jour les informations d'un utilisateur.
     * @param {number} id - ID de l'utilisateur.
     * @param {Object} user - Objet contenant les nouvelles informations de l'utilisateur.
     * @param {Function} navigate - Fonction de navigation pour rediriger après la mise à jour.
     * @param {Object} toast - Instance de notification pour afficher un message.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static updateUser(id, user, navigate, toast) {
        try {
            const response = await apiClient.patch(`/users/${id}`, user);
            navigate(-1);
            toast.success("Les informations de l'utilisateur ont été mises à jour avec succès !");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Supprime un utilisateur.
     * @param {number} id - ID de l'utilisateur.
     * @param {Function} navigate - Fonction de navigation pour rediriger après la suppression.
     * @param {Object} toast - Instance de notification pour afficher un message.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static async deleteUser(id, navigate, toast) {
        return apiClient
            .delete(`/users/${id}`)
            .then(() => {
                toast.success("L'utilisateur a bien été supprimé.");
                navigate(-1);
            })
            .catch((error) => {
                throw error;
            });
    }

    /**
     * Définit le token JWT dans les headers d'axios pour les futures requêtes authentifiées.
     * @param {string} token - Jeton JWT de l'utilisateur.
     */
    static setAxiosToken(token) {
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
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
        const token = window.localStorage.getItem("authToken");
        if (token && UserServices.isAuthenticated()) {
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
            return role === admin; // Vérifie si le rôle est "Admin"
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
     * @returns {string | null} - Le nom de l'utilisateur ou null en cas d'erreur.
     */
    static userName() {
        if (UserServices.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            try {
                const { user } = jwtDecode(token);
                return user;
            } catch (error) {
                console.error("Erreur lors de la récupération du nom d'utilisateur:", error);
                return null;
            }
        }
        return null;
    }

    /**
     * Récupère l'ID de l'utilisateur à partir du token JWT.
     * @returns {number | null} - L'ID de l'utilisateur ou null en cas d'erreur.
     */
    static getUserId() {
        const token = window.localStorage.getItem("authToken");
        if (!token) return null;
        try {
            const { id } = jwtDecode(token);
            return id;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'ID utilisateur:", error);
            return null;
        }
    }
}

export default UserServices;
