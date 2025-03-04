import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error) {
      console.log(error);
      const errorMessage = error.response.data.errors[0] || error.message || "Une erreur est survenue.";
      toast.error(errorMessage);
    } else {
      toast.error("Une erreur inconnue s'est produite.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;