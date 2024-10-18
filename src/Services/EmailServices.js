import axios from "axios";
import { URL } from './config';

const resetPasswordEmail = async (email) => {
    try {
        const response = await axios.post(`${URL}/email/request-password-reset`, { email });
        console.log("La réponse du back :", response);
        return response;
    } catch (error) {
        console.log("S'il y a une erreur ou système de sécurité enclenché :", error.response);

        // Vérifie si error.response existe pour éviter les erreurs de null
        if (error.response) {
            // Vérifie si le statut de l'erreur est 429 (trop de requêtes)
            if (error.response.status === 429) {

                // Récupère le temps d'attente en secondes et le convertit en entier
                const retryAfter = parseInt(error.response.headers['retry-after'], 10); 

                console.log("retryAfter =", retryAfter); // Log de la valeur de retryAfter

                // Vérifie que retryAfter est un nombre valide
                if (!isNaN(retryAfter)) {
                    const minutes = Math.floor(retryAfter / 60); // Convertit en minutes
                    const seconds = retryAfter % 60; // Récupère les secondes restantes
                    
                    console.log(`Il reste ${minutes} minute(s) et ${seconds} seconde(s)`); 
                    
                    throw new Error(`Trop de tentatives. Veuillez réessayer dans ${minutes} minute(s) et ${seconds} seconde(s).`);
                } else {
                    // Gestion de l'erreur si la valeur de retryAfter n'est pas valide
                    throw new Error('Erreur : Le temps d\'attente est invalide.');
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
