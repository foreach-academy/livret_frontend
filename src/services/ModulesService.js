import apiClient from "../utils/apiClient";

/**
 * Récupère tous les modules disponibles.
 * @returns {Promise} - Promesse contenant les données des modules.
 */
function getAllModules() {
  return apiClient.get('/modules');
}

/**
 * Récupère les détails d'un module spécifique par son ID.
 * @param {number} id - L'identifiant du module.
 * @returns {Promise} - Promesse contenant les données du module.
 */
function getModuleById(id) {
  return apiClient.get(`/modules/${id}`);
}

/**
 * Ajoute un nouveau module.
 * @param {Object} module - Objet contenant les informations du module.
 * @param {Function} setRefresh - Fonction pour rafraîchir les données après l'ajout.
 * @param {Function} setDisplayAddModule - Fonction pour masquer le formulaire d'ajout.
 * @param {Object} toast - Instance de notification pour afficher un message.
 * @param {Function} setNewModule - Fonction pour réinitialiser le formulaire d'ajout.
 * @param {number} id - ID de la formation associée.
 */function getModulesByTraining(training_id, setPromotion) {
  apiClient.get(`${process.env.REACT_APP_API_URL}/modules/training/${training_id}`)
  .then((response) => {
      setPromotion((prev) => ({
          ...prev,
          modules: response.data.map(module => ({
              ...module,
              trainerId: "", 
              startDate: "", 
              endDate: ""
          }))
      }));
  })
  .catch(error => {
      console.error("Erreur lors de la récupération des modules :", error);
  });
}


async function addModule(module, setRefresh, setDisplayAddModule, toast, setNewModule, id) {
  if (!module.title || !module.commentary) {
    toast.error("Impossible d'ajouter un module vide", {
      className: "toast-error",
    });
    return;
  }
  try {
    const response = await apiClient.post('/modules', module);
    toast.success(`Module ${module.title} ajouté`);
    setRefresh(true);
    setDisplayAddModule(false);
    setNewModule({ title: "", commentary: "", training_id: id });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Met à jour un module existant.
 * @param {number} id - ID du module à mettre à jour.
 * @param {Object} module - Objet contenant les nouvelles informations du module.
 * @param {Object} toast - Instance de notification pour afficher un message.
 * @param {Function} setRefresh - Fonction pour rafraîchir les données après la mise à jour.
 * @param {Function} setModuleModification - Fonction pour désactiver le mode d'édition.
 */
async function updateModule(id, module, toast, setRefresh, setModuleModification) {
  try {
    const response = await apiClient.put(`/modules/${id}`, module);
    toast.success(`Mise à jour du module ${module.title}`);
    setRefresh(true);
    setModuleModification(null);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Supprime un module existant.
 * @param {number} id - ID du module à supprimer.
 * @param {Object} toast - Instance de notification pour afficher un message.
 * @param {Function} setRefresh - Fonction pour rafraîchir les données après la suppression.
 */
async function deleteModule(id, toast, setRefresh) {
  try {
    await apiClient.delete(`${process.env.REACT_APP_API_URL}/modules/${id}`).then((response) => {
      toast.success("Le module a bien été supprimé")
      setRefresh(true);
    })
  } catch (error) {
    console.error("Erreur lors de la suppression du module", error);
    throw error;
  }
}
async function updateModulePromotion(module){
  try {
    await apiClient.patch(`${process.env.REACT_APP_API_URL}/modules/promotion`, module).then((response) => {
      console.log(response.data);
    })
  } catch (error) {
    console.error("Erreur lors de la mise à jour du module promotionnel", error);
    throw error;
  }
}

export default { getAllModules, getModuleById, addModule, updateModule, deleteModule, getModulesByTraining, updateModulePromotion };
