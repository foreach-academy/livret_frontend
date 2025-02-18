import axios from 'axios';

function getAllModules() {
    return axios.get(`${process.env.REACT_APP_API_URL}/modules`);
}

function getModuleById(id) {
    return axios.get(`${process.env.REACT_APP_API_URL}/modules/${id}`);
}

function addModule(module) {
    return axios.post(`${process.env.REACT_APP_API_URL}/modules`, module);
}
export default { getAllModules, addModule, getModuleById}