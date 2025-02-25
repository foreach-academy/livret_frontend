import axios from 'axios';

function getAllModules() {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules`);
}

function getModuleById(id) {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules/${id}`);
}

async function addModule(module, setRefresh, setDisplayAddModule, toast) {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/modules`, module).then((response) => {
      toast.success("Ajout du module")
      setRefresh(true);
      setDisplayAddModule(false);
    })
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

async function deleteModule(id, toast, setRefresh) {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/modules/${id}`).then((response) => {
      toast.success(response.data.message)
      setRefresh(true);
    })
  } catch (error) {
    console.error("Erreur lors de la suppression du module", error);
    throw error;
  }
}

export default { getAllModules, getModuleById, addModule, updateModule, deleteModule };
