import axios from "axios";

function fetchAllPromotions() {
    return axios.get(`${process.env.REACT_APP_API_URL}/promotions`);
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

function deletePromotion(id) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/promotions/${id}`);
}

export default { fetchAllPromotions, fetchPromotionById, addPromotion, updatePromotion, deletePromotion };