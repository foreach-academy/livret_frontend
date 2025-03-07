import apiClient from '../utils/apiClient';

async function addModulePromotion(modulePromotion) {
    try {
        const response = await apiClient.post(
            `${process.env.REACT_APP_API_URL}/module_promotion`, 
            modulePromotion
        );
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du module à la promotion", error);
        throw error;
    }
}

export default { addModulePromotion };