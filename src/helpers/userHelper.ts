import axios from "axios";
import { User } from "../models/User";
import { endpointUrl } from "../config/userManagementConig";

export const validateSession = async (): Promise<User | void> => {
  try {
    const user = await axios.get<User>(`${endpointUrl}/validateSession`, {
      withCredentials: true,
    });
    return user.data;
  } catch (error) {
    console.error("Error validating session:", error);
  }
};
