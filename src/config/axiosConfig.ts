import axios from "axios";
import { endpointUrl } from "./endpointConfig";

axios.defaults.baseURL = endpointUrl;
axios.defaults.withCredentials = true;

export default axios;
