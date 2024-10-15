import axios from "axios";
import {URL} from './config';
import {jwtDecode} from "jwt-decode";

class UserServices{
    static async fetchAllUser() {
        try {
            return await axios.get(URL + '/users');
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw error;
        }
    }
    
    static fetchUserById(id){
        return axios.get(URL+"/users/"+id)
    }
    static addUser(users){
        return axios.post(URL+'/users', users)
    }
    static getUserByRole(roleName){
        return axios.get(`${URL}/users/role/${roleName}`);
    }
    static UpdateUser(id, roleId){
        return axios.patch(`${URL}/users/update/${id}`, { role_id: roleId })
    }

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

    static async login(user) {
        try {
            const response = await axios.post(`${URL}/authenticate/login`, user);
            return response; // Renvoie la réponse si elle est réussie
        } catch (error) {
            if (error.response) {
                // Si le serveur renvoie un code 429, nous récupérons le temps d'attente
                if (error.response.status === 429) {
                    const retryAfter = error.response.headers['retry-after']; // Récupère le temps d'attente en secondes
                    const minutes = Math.floor(retryAfter / 60); // Convertit en minutes
                    const seconds = retryAfter % 60; // Récupère les secondes restantes

                    // Retourner le temps d'attente en plus de l'erreur
                    throw { message: `Trop de tentatives. Veuillez réessayer dans ${minutes} minute(s) et ${seconds} seconde(s).`, retryAfter: retryAfter };
                }
                // Autres erreurs provenant de la réponse du serveur
                console.error('Erreur de réponse du serveur:', error.response.data);
                throw { message: error.response.data.message || 'Erreur lors de la connexion.' };
            } else if (error.request) {
                // La requête a été envoyée mais aucune réponse n'a été reçue
                console.error('Aucune réponse du serveur:', error.request);
                throw { message: 'Aucune réponse du serveur. Veuillez réessayer plus tard.' };
            } else {
                // Autre erreur lors de la configuration de la requête
                console.error('Erreur lors de la configuration de la requête:', error.message);
                throw { message: 'Erreur lors de la tentative de connexion.' };
            }
        }
    }

    static logout() {
        window.localStorage.removeItem("authToken");
        delete axios.defaults.headers["Authorization"];
    }

    static setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    static isAuthenticated() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            try {
                const { exp: expiration } = jwtDecode(token);
                return expiration * 1000 > new Date().getTime();
            } catch (error) {
                console.error("Erreur lors du décodage du token JWT:", error);
                return false;
            }
        }
        return false;
    }

    static checkToken() {
        if (UserServices.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            const decoded = jwtDecode(token);
            console.log("Contenu du token décodé :", decoded); 
            UserServices.setAxiosToken(token);
        } else {
            UserServices.logout();
        }
    }

    static isAdmin() {
        if (UserServices.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            const {role} = jwtDecode(token); 
            return role === "Admin"; 
        }
        return false;
    }

    static getUserId(){
        const token = window.localStorage.getItem("authToken");
        const tokenData = jwtDecode(token);
        return tokenData.id;
    }
}
export default UserServices;