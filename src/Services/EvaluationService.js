import axios from "axios";
import { URL } from "./config";

class EvaluationServices {
    static addEvaluation(evaluation) {
        return axios.post(`${URL}/evaluation`, evaluation);
    }

    static getAllEvaluationTypes(){
        return axios.get(`${URL}/evaluation_type`);
    }

}

export default EvaluationServices;