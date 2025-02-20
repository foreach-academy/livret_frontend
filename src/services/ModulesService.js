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

function updateModule(id, module) {
    return axios.put(`${process.env.REACT_APP_API_URL}/modules/${id}`, module);
}

function deleteModule(id) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/modules/${id}`);
}
export default { getAllModules, addModule, getModuleById, updateModule, deleteModule}