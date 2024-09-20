import axios from "axios";
import {URL} from './config';
import {jwtDecode} from "jwt-decode";

class UserServices{
    static fetchAllUser(){
        return axios.get(URL+'/user')
    }
    static fetchUserById(id){
        return axios.get(URL+"/user"+id)
    }
    static addUser(users){
        return axios.post(URL+'/user', users)
    }
    static GetUserByRole(roleName){
        return axios.get(URL+"/user/role", +roleName)
    }

    static login (user){
        return axios.post(URL+"/authenticate/login", user)
    }

    static logout() {
        window.localStorage.removeItem("authToken");
        delete axios.defaults.headers["Authorization"];
    }

    static setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    static setup() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
          const { exp: expiration } = jwtDecode(token);
          if (expiration * 1000 > new Date().getTime()) {
            this.setAxiosToken(token);
          } else {
            this.logout();
          }
        } else {
          this.logout();
        }
    }

    static isAuthenticated() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            try {
                const { exp: expiration } = jwtDecode(token); // Decode le token
                if (expiration * 1000 > new Date().getTime()) { // Vérifie la validité
                    return true;
                } else {
                    this.logout(); // Token expiré, déconnecte l'utilisateur
                }
            } catch (error) {
                console.error("Erreur lors du décodage du token JWT:", error);
                this.logout(); // En cas d'erreur, déconnecte l'utilisateur
            }
        }
        return false; // Aucun token ou token invalide
    }
}
export default UserServices;