import axios from "axios"; // Importe la bibliothèque axios pour gérer les requêtes HTTP
import { URL } from "./config"; // Importe l'URL de base depuis le fichier de configuration

// Définition de la classe de service EmailServices pour gérer les requêtes liées aux e-mails
class EmailServices {
    // Méthode asynchrone pour envoyer une requête de réinitialisation de mot de passe
    static resetPasswordEmail = async (email) => {
        try {
            // Envoie une requête POST au serveur avec l'email de l'utilisateur
            const response = await axios.post(`${URL}/email/request-password-reset`, { email });
            console.log("Réponse du serveur (succès) :", response); // Affiche la réponse si la requête réussit
            return response; // Retourne la réponse
        } catch (error) {
            console.log("Erreur captée :", error); // Affiche l'erreur en cas de problème

            // Si aucune réponse du serveur, cela signifie une erreur de réseau ou que le serveur est injoignable
            if (!error.response) {
                console.log("Aucune réponse du serveur (erreur de réseau ou serveur injoignable)");
                throw { message: 'Problème de connexion ou le serveur est injoignable.', response: null };
            }

            // Si le serveur renvoie une erreur de statut 429 (trop de requêtes envoyées)
            if (error.response.status === 429) {
                // Récupère la valeur "retry-after" pour savoir combien de temps attendre avant une nouvelle tentative
                const retryAfter = parseInt(error.response.headers['retry-after'], 10);
                
                // Si retryAfter est un nombre valide
                if (!isNaN(retryAfter)) {
                    // Calcule le temps d'attente en minutes et secondes
                    const minutes = Math.floor(retryAfter / 60);
                    const seconds = retryAfter % 60;
                    console.log(`il reste ${minutes} minutes et ${seconds} seconde`);
                    
                    // Lance une erreur avec un message indiquant le temps d'attente restant
                    throw { 
                        message: `Trop de tentatives. Veuillez réessayer dans ${minutes} minute(s) et ${seconds} seconde(s).`, 
                        response: error.response 
                    };
                } else {
                    // Si retryAfter n'est pas valide, lance une erreur générique
                    throw { message: 'Erreur : Le temps d\'attente est invalide.', response: error.response };
                }
            }

            // Pour toute autre erreur de réponse du serveur
            throw { 
                message: `Erreur ${error.response.status}: ${error.response.data.message || 'Une erreur est survenue.'}`, 
                response: error.response 
            };
        }
    }
}

export default EmailServices; // Exporte la classe pour une utilisation ailleurs
