import axios from "axios";

async function fetchAllPromotions() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/promotions`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des promotions:",error.message
    );
    throw error;
  }
}

function fetchPromotionById(id) {
  return axios.get(`${process.env.REACT_APP_API_URL}/promotions/${id}`);
}

function addPromotion(promotion) {
  return axios.post(`${process.env.REACT_APP_API_URL}/promotions`, promotion);
}

function updatePromotion(id, promotion) {
  return axios.patch(`${process.env.REACT_APP_API_URL}/promotions/${id}`, promotion);
}

function addStudientToPromotion(promotion_id, studient_id) {
  return axios.post(`${process.env.REACT_APP_API_URL}/studients-promotion`, { promotion_id, studient_id });
}

function deleteStudientFromPromotion(promotion_id, studient_id) {
  return axios.delete(`${process.env.REACT_APP_API_URL}/studients-promotion/${studient_id}/${promotion_id}`);
}

function addTrainerToPromotion(promotion_id, trainer_id) {
  return axios.post(`${process.env.REACT_APP_API_URL}/trainers-promotion/`, { promotion_id, trainer_id });
}

function deleteTrainerFromPromotion(promotion_id, trainer_id) {
  return axios.delete(`${process.env.REACT_APP_API_URL}/trainers-promotion/${trainer_id}/${promotion_id}`);
}

function addSupervisorToPromotion(promotion_id, supervisor_id) {
  return axios.post(`${process.env.REACT_APP_API_URL}/supervisors-promotion`, { promotion_id, supervisor_id });
}

function deleteSupervisorFromPromotion(promotion_id, supervisor_id) {
  return axios.delete(`${process.env.REACT_APP_API_URL}/supervisors-promotion/${supervisor_id}/${promotion_id}`);
}

function deletePromotion(id) {
  return axios.delete(`${process.env.REACT_APP_API_URL}/promotions/${id}`);
}

export default { 
  fetchAllPromotions, 
  fetchPromotionById, 
  addPromotion, 
  updatePromotion, 
  deletePromotion,
  addStudientToPromotion, 
  deleteStudientFromPromotion,
  addTrainerToPromotion, 
  deleteTrainerFromPromotion,
  addSupervisorToPromotion, 
  deleteSupervisorFromPromotion 
};
