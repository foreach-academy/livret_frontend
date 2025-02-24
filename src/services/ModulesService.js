import axios from 'axios';

function getAllModules() {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules`);
}

function getModuleById(id) {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules/${id}`);
}

async function addModule(module) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/modules`, module);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du module", error);
      throw error;
    }
  }

async function updateModule(id, module) {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/modules/${id}`, module);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification du module", error);
    throw error;
  }
}

async function deleteModule(id) {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/modules/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression du module", error);
      throw error;
    }
  }

export default { getAllModules, getModuleById, addModule, updateModule, deleteModule };
