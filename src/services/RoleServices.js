import axios from "axios"; // Importe axios pour les requêtes HTTP

// Classe RoleServices pour gérer les opérations relatives aux rôles
class RoleServices {
    
    // Récupère tous les rôles disponibles
    static fetchAllRoles(setRoles) {
        return axios.get(process.env.REACT_APP_API_URL + '/roles').then((response)=> {
            setRoles(response.data);
        }); // Envoie une requête GET à l'endpoint /role pour obtenir tous les rôles
    }

    // Récupère les détails d'un rôle spécifique via son ID
    static fetchRoleByID(id) {
        return axios.get(process.env.REACT_APP_API_URL + 'roles/' + id); // Envoie une requête GET à l'endpoint /role/{id} pour obtenir un rôle spécifique
    }

    // Ajoute un nouveau rôle en envoyant les données du rôle
    static addRole(role) {
        return axios.post(process.env.REACT_APP_API_URL + 'roles/', role); // Envoie une requête POST avec les informations du rôle à ajouter
    }
}

export default RoleServices; // Exporte la classe pour l'utiliser ailleurs dans l'application
