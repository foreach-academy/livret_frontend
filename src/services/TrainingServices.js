import axios from "axios";
import { URL_BACK_GET_TRAINING_BY_ID } from "../utils/backUrl";

async function fetchAllTrainings(setTrainings) {
    try {
        await axios.get(`${process.env.REACT_APP_API_URL}/trainings`).then(
            (response) => {
                setTrainings(response.data)
            }
        )
    } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
        throw error;
    }
}

async function fetchTrainingById(id, setTraining) {
    try {
        return await axios.get(`${process.env.REACT_APP_API_URL}${URL_BACK_GET_TRAINING_BY_ID(id)}`).then((response) => {
            setTraining(response.data);
        })

    } catch (error) {
        console.error("Erreur lors de la récupération de la formation:", error);
        throw error;
    }
}

async function addTraining(trainings) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/trainings`, trainings);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la formation", error);
        throw error;
    }
}

async function updateTraining(id, trainings) {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/trainings/${id}`, trainings);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la modification de la formation", error);
        throw error;
    }
}

function deleteTraining(id) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/trainings/${id}`);
}

export default {
    fetchAllTrainings,
    fetchTrainingById,
    addTraining,
    updateTraining,
    deleteTraining
};
