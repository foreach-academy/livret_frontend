import axios from "axios";
import {URL} from './config';


class FormationServices {
    static getModulesByFormationId(formationId) {
        return axios.get(`${URL}/formation/${formationId}`);
    }

    static getStudentsEvaluationsByFormationAndModule(formationId, moduleId) {
        return axios.get(`${URL}/formation/${formationId}/${moduleId}`);
    }
}

export default FormationServices;

