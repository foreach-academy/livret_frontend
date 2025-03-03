import axios from "axios"; 

class EmailServices {

    static resetPasswordEmail = async (email) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/emails/request-password-reset`, { email });
            return response; 
        } catch (error) {
            if (!error.response) {
                throw { message: 'Problème de connexion ou le serveur est injoignable.', response: null };
            }

            if (error.response.status === 429) {
                const retryAfter = parseInt(error.response.headers['retry-after'], 10);
                
                if (!isNaN(retryAfter)) {
                    const minutes = Math.floor(retryAfter / 60);
                    const seconds = retryAfter % 60;
                    
                    throw { 
                        message: `Trop de tentatives. Veuillez réessayer dans ${minutes} minute(s) et ${seconds} seconde(s).`, 
                        response: error.response 
                    };
                } else {
                    throw { message: 'Erreur : Le temps d\'attente est invalide.', response: error.response };
                }
            }

            throw { 
                message: `Erreur ${error.response.status}: ${error.response.data.message || 'Une erreur est survenue.'}`, 
                response: error.response 
            };
        }
    }
}

export default EmailServices;
