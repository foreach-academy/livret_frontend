import apiClient from "../utils/apiClient";
import { URL_BACK_GET_TRAINING_BY_ID } from "../utils/backUrl";

/**
 * Récupère la liste complète de toutes les formations.
 * @param {Function} setTrainings - Fonction pour mettre à jour l'état des formations.
 * @returns {Promise} - Promesse contenant les données de toutes les formations.
 */
async function fetchAllTrainings(setTrainings) {
    try {
        const response = await apiClient.get('/trainings');
        setTrainings(response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
        
    }
}

/**
 * Récupère les informations d'une formation spécifique par son ID.
 * @param {number} id - L'identifiant de la formation.
 * @param {Function} setTraining - Fonction pour mettre à jour l'état de la formation.
 * @returns {Promise} - Promesse contenant les données de la formation.
 */
async function fetchTrainingById(id, setTraining) {
    try {
        const response = await apiClient.get(URL_BACK_GET_TRAINING_BY_ID(id));
        setTraining(response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la formation:", error);
        
    }
}

/**
 * Ajoute une nouvelle formation.
 * @param {Object} trainings - Objet contenant les informations de la formation.
 * @param {Function} navigate - Fonction de navigation pour rediriger après l'ajout.
 * @param {Object} toast - Instance de notification pour afficher un message.
 * @returns {Promise} - Promesse contenant la réponse du serveur.
 */
async function addTraining(trainings, navigate, toast) {
    try {
        const response = await apiClient.post('/trainings', trainings);
        navigate(-1);
        toast.success("Formation et modules ajoutés avec succès !");
        return response.data;
    } catch (error) {
        
    }
}

/**
 * Met à jour une formation existante.
 * @param {number} id - ID de la formation.
 * @param {Object} trainings - Objet contenant les nouvelles informations de la formation.
 * @param {Function} setRefresh - Fonction pour rafraîchir les données après la mise à jour.
 * @param {Function} setIsEditing - Fonction pour désactiver le mode édition.
 * @param {Object} toast - Instance de notification pour afficher un message.
 * @returns {Promise} - Promesse contenant la réponse du serveur.
 */
async function updateTraining(id, trainings, setRefresh, setIsEditing, toast) {
    try {
        const response = await apiClient.patch(`/trainings/${id}`, trainings);
        setRefresh(true);
        setIsEditing(false);
        toast.success(`La formation ${trainings.title} a été mise à jour`);
        return response.data;
    } catch (error) {
        
    }
}

/**
 * Supprime une formation.
 * @param {number} id - ID de la formation.
 * @returns {Promise} - Promesse contenant la réponse du serveur.
 */
function deleteTraining(id) {
    return apiClient.delete(`/trainings/${id}`);
}

export default {
    fetchAllTrainings,
    fetchTrainingById,
    addTraining,
    updateTraining,
    deleteTraining
};
