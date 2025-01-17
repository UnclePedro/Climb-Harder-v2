import axios from "axios";

// https://api.climb-harder.peterforsyth.dev
// http://localhost:8080

axios.defaults.baseURL = "https://api.climb-harder.peterforsyth.dev";
axios.defaults.withCredentials = true;

export default axios;
