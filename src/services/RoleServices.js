import apiClient from "../utils/apiClient"; 

class RoleServices {
    
    /**
     * Récupère tous les rôles disponibles.
     * @param {Function} setRoles - Fonction pour mettre à jour l'état des rôles.
     * @returns {Promise} - Promesse contenant les données des rôles.
     */
    static async fetchAllRoles(setRoles) {
        try {
            const response = await apiClient.get('/roles');
            setRoles(response.data);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des rôles:", error);
            throw error;
        }
    }

    /**
     * Récupère les détails d'un rôle spécifique via son ID.
     * @param {number} id - L'identifiant du rôle.
     * @returns {Promise} - Promesse contenant les données du rôle spécifique.
     */
    static async fetchRoleByID(id) {
        try {
            return await apiClient.get(`/roles/${id}`);
        } catch (error) {
            console.error(`Erreur lors de la récupération du rôle avec ID ${id}:`, error);
            throw error;
        }
    }

    /**
     * Ajoute un nouveau rôle en envoyant les données du rôle.
     * @param {Object} role - Objet contenant les informations du rôle.
     * @returns {Promise} - Promesse contenant la réponse du serveur.
     */
    static async addRole(role) {
        try {
            return await apiClient.post('/roles/', role);
        } catch (error) {
            console.error("Erreur lors de l'ajout du rôle:", error);
            throw error;
        }
    }
}

export default RoleServices;
