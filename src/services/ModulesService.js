import axios from 'axios';

function getAllModules() {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules`);
}

function getModuleById(id) {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules/${id}`);
}

async function addModule(module, setRefresh, setDisplayAddModule, toast, setNewModule, id) {
  if (!module.title ||!module.commentary) {
    toast.error("Impossible d'ajouter un module vide")
    return
  }
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/modules`, module).then((response) => {
      toast.success(`Module ${module.title} ajouté`)
      setRefresh(true);
      setDisplayAddModule(false);
      setNewModule({ title: "", commentary: "", training_id: id });
 
    })
  } catch (error) {
    console.error("Erreur lors de la création du module", error);
    throw error;
  }
}

async function updateModule(id, module, toast, setRefresh, setModuleModification) {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/modules/${id}`, module).then((response) => {
      toast.success(`Mise à jour du module ${module.title}`)
      setRefresh(true);
      setModuleModification(null);
      return response.data
  })
  } catch (error) {
    console.error("Erreur lors de la modification du module", error);
    throw error;
  }
}

async function deleteModule(id, toast, setRefresh) {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/modules/${id}`).then((response) => {
      toast.success("Le module a bien été supprimé")
      setRefresh(true);
    })
  } catch (error) {
    console.error("Erreur lors de la suppression du module", error);
    throw error;
  }
}

export default { getAllModules, getModuleById, addModule, updateModule, deleteModule };
