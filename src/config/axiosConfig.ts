import axios from "axios";
import { getUserFromLocalStorage } from "../helpers/userHelper";

// https://api.climbharder.peterforsyth.dev
// http://localhost:8080

axios.defaults.baseURL = "https://api.climbharder.peterforsyth.dev";

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
