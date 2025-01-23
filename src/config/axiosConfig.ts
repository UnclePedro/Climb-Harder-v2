import axios from "axios";
import { endpointUrl } from "./endpointConfig";

const axiosInstance = axios.create({
  baseURL: endpointUrl,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response as-is for successful requests
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const redirectUrl = error.response?.data?.redirectUrl;

      if (redirectUrl) {
        // Redirect the user to the login page or another location
        return (window.location.href = redirectUrl);
      }
    }
    // For other errors, pass them along to the caller
    return Promise.reject(error);
  }
);

export default axiosInstance;
