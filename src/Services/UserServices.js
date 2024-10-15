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
            // console.log("Contenu du token décodé :", decoded); 
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