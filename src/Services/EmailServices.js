import axios from "axios";
import {URL} from './config';

const resetPasswordEmail = async (email) => {
    try {
        const response = await axios.post(`${URL}/email/request-password-reset`, { email });
        console.log("la response du back :", response);
        return response;
    } catch (error) {
        console.log("si il y 'a une erreur ou systéme de sécurité enclenché :", error.response) 
        // Vérifie si error.response existe pour éviter les erreurs de null
        if (error.response) {
            // Vérifie si le statut de l'erreur est 429 (trop de requêtes)
            if (error.response.status === 429) {
                const retryAfter = error.response.headers.get('retry-after');
                const parsedRetryAfter = parseInt(retryAfter, 10);
                if (!isNaN(parsedRetryAfter)) {
                    throw new Error(`Veuillez attendre ${parsedRetryAfter} secondes avant de réessayer.`);
                } else {
                    throw new Error('Erreur : Le temps d\'attente est indéfini.');
                }
            }
            // Autres gestion d'erreurs si nécessaire
            throw new Error(`Erreur ${error.response.status}: ${error.response.data.message || 'Une erreur est survenue.'}`);
        } else {
            // Si error.response n'existe pas, cela signifie qu'il y a un problème avec la requête elle-même
            throw new Error('Erreur : Problème de connexion ou de configuration.');
        }
    }
}

export default { resetPasswordEmail };
