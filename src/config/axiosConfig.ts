import axios from "axios";
import { getUser } from "../helpers/userHelper";

// https://climb-harder-api.vercel.app
// http://localhost:8080

axios.defaults.baseURL = "http://localhost:8080";

getUser().then((user) => {
  axios.defaults.headers.common["id"] = user.id;
  axios.defaults.headers.common["apiKey"] = user.apiKey;
});

export default axios;
