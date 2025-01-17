import axios from "axios";

// https://climb-harder-api.peterforsyth.dev
// http://localhost:8080

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export default axios;
