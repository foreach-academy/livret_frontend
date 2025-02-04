import axios from "axios"; // Importe axios pour les requêtes HTTP

// Définition de la classe EvaluationServices pour les opérations liées aux évaluations
class EvaluationServices {

    // Méthode pour ajouter une nouvelle évaluation
    static addEvaluation(evaluation) {
        return axios.post(`${process.env.REACT_APP_API_URL}/evaluation`, evaluation); // Envoie une requête POST avec les données de l'évaluation
    }

    // Méthode pour modifier une évaluation existante en fonction de son ID
    static editEvaluation(evaluationId, evaluation) {
        return axios.patch(`${process.env.REACT_APP_API_URL}/evaluation/${evaluationId}`, evaluation); // Envoie une requête PATCH pour mettre à jour l'évaluation
    }

    // Méthode pour récupérer tous les types d'évaluation disponibles
    static getAllEvaluationTypes() {
        return axios.get(`${process.env.REACT_APP_API_URL}/evaluation-type`); // Envoie une requête GET pour obtenir tous les types d'évaluation
    }

    // Méthode pour associer un type d'évaluation spécifique à un module
    static addEvaluationTypeToModule(evaluationType) {
        return axios.post(`${process.env.REACT_APP_API_URL}/evaluation-type`, evaluationType); // Envoie une requête POST pour ajouter un type d'évaluation à un module
    }

    // Méthode pour récupérer tous les résultats d'évaluation possibles
    static getAllEvaluationResultats() {
        return axios.get(`${process.env.REACT_APP_API_URL}/evaluation-resultat`); // Envoie une requête GET pour obtenir tous les résultats d'évaluation
    }

    // Méthode pour récupérer les types d'évaluation associés à un module spécifique via son ID
    static getEvaluationTypeByModuleId(moduleId) {
        return axios.get(`${process.env.REACT_APP_API_URL}/evaluation-type/${moduleId}`); // Envoie une requête GET pour obtenir les types d'évaluation du module
    }

    // Méthode pour obtenir les détails d'un module spécifique via son ID
    static getModuleById(moduleId) {
        return axios.get(`${process.env.REACT_APP_API_URL}/module/${moduleId}`); // Envoie une requête GET pour obtenir les informations du module
    }

    // Méthode pour supprimer l'association d'un type d'évaluation d'un module spécifique
    static removeEvaluationTypeFromModule({ module_id, evaluation_type_id }) {
        // Envoie une requête DELETE en envoyant les IDs du module et du type d'évaluation dans le corps de la requête
        return axios.delete(`${process.env.REACT_APP_API_URL}/evaluation-type`, { data: { module_id, evaluation_type_id } });
    }

}

export default EvaluationServices; // Exporte la classe pour l'utiliser ailleurs dans l'application