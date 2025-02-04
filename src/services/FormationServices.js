import axios from "axios"; // Importe axios pour les requêtes HTTP

class FormationServices {
    
    // Récupère tous les modules associés à une formation spécifique via l'ID de la formation
    static getModulesByFormationId(formationId) {
        return axios.get(`${process.env.REACT_APP_API_URL}/formation/${formationId}`); // Envoie une requête GET avec l'ID de la formation
    }

    // Récupère tous les modules d'une formation spécifique en fonction de l'ID de la formation et de l'ID du formateur
    static getModulesByFormationIdAndFormateurId(formationId, formateurId) {
        return axios.get(`${process.env.REACT_APP_API_URL}/formation/${formationId}/formateur/${formateurId}`); // Requête GET pour les modules d'un formateur spécifique
    }

    // Récupère toutes les évaluations des étudiants d'une formation pour un module spécifique
    static getStudentsEvaluationsByFormationAndModule(formationId, moduleId) {
        return axios.get(`${process.env.REACT_APP_API_URL}/formation/${formationId}/${moduleId}`); // Requête GET pour les évaluations des étudiants dans un module donné
    }

    // Récupère les évaluations d'un étudiant spécifique pour un module spécifique
    static getStudentEvaluationsByModule(studentId, moduleId) {
        return axios.get(`${process.env.REACT_APP_API_URL}/formation/${studentId}/module/${moduleId}`); // Requête GET pour les évaluations d'un étudiant dans un module donné
    }
}

export default FormationServices; // Exporte la classe pour l'utiliser ailleurs dans l'application
