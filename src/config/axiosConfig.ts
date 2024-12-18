import axios from "axios";
import { getUserFromLocalStorage } from "../helpers/userHelper";

// https://climb-harder-api.vercel.app
// http://localhost:8080

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.request.use(
  async (config) => {
    // Need to use react authContext to deliver user details to my app before any requests are made

    const user = getUserFromLocalStorage();

    if (user.apiKey) {
      config.headers["apiKey"] = user.apiKey;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
