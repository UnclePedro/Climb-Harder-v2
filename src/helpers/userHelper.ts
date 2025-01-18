import axios from "axios";
import { User } from "../models/User";
import { endpointUrl } from "../config/endpointConfig";

export const validateSession = async (): Promise<User | void> => {
  try {
    const user = await axios.get<User>(`${endpointUrl}/validateSession`);
    return user.data;
  } catch (error) {
    console.error("Error validating session:", error);
  }
};
