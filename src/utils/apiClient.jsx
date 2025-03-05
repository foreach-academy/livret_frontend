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
    let errorMessage = "Une erreur inconnue s'est produite.";
    console.log("erreur api :", error)
    if (error.response && error.response.data) {
      if (error.response.data.errors && error.response.data.errors.length > 0) {
        errorMessage = error.response.data.errors[0];
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }

    toast.error(errorMessage, {
      className: "toast-error",
    });
    return Promise.reject(error);
  }
);

export default apiClient;
