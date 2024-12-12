import axios from "axios";
import { getUser } from "../helpers/userHelper";

// https://climb-harder-api.vercel.app
// http://localhost:8080

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.request.use(
  async (config) => {
    // Currently only works if user exists in localStorage, need to work on this
    const user = await getUser();

    if (user.apiKey) {
      config.headers["apiKey"] = user.apiKey;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
