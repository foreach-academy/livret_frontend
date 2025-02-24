import axios from "axios";

async function fetchAllTraining() {
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trainings`);
        return response.data; 
    }
    catch(error){
        console.error("Error fetching training data:", error);
        throw error;
    }
}

function fetchTrainingById(id) {
    return axios.get(`${process.env.REACT_APP_API_URL}/trainings/${id}`);
}

function addTraining(trainings) {
    return axios.post(`${process.env.REACT_APP_API_URL}/trainings`, trainings);
}

function updateTraining(id, trainings) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/trainings/${id}`, trainings);
}

function deleteTraining(id) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/trainings/${id}`);
}

export default { fetchAllTraining,fetchTrainingById, fetchAllTraining, addTraining, updateTraining, deleteTraining}