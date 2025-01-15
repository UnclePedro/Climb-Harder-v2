import axios from "axios";
import { getUserFromLocalStorage } from "../helpers/userHelper";

// https://climb-harder-api.peterforsyth.dev
// http://localhost:8080

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.request.use(
  async (config) => {
    const user = getUserFromLocalStorage();

    if (user.apiKey) {
      config.headers["apiKey"] = user.apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
