import axios from "axios";
import { URL } from "./config";

class EvaluationServices {
    static addEvaluation(evaluation) {
        return axios.post(`${URL}/evaluation`, evaluation);
    }

    static editEvaluation(evaluationId, evaluation) {
        return axios.patch(`${URL}/evaluation/${evaluationId}`, evaluation)
    }

    static getAllEvaluationTypes(){
        return axios.get(`${URL}/evaluation-type`);
    }

    static addEvaluationTypeToModule(evaluationType) {
        return axios.post(`${URL}/evaluation-type`, evaluationType);
    }

    static getAllEvaluationResultats() {
        return axios.get(`${URL}/evaluation-resultat`);
    }

    static getEvaluationTypeByModuleId(moduleId) {
        return axios.get(`${URL}/evaluation-type/${moduleId}`);
    }

    static getModuleById(moduleId) {
        return axios.get(`${URL}/module/${moduleId}`);
    }

    static removeEvaluationTypeFromModule({ module_id, evaluation_type_id }) {
        return axios.delete(`${URL}/evaluation-type`, { data: { module_id, evaluation_type_id } });
    }

}

export default EvaluationServices;