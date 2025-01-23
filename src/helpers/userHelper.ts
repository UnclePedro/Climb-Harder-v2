// import axios from "axios";
import axiosInstance from "../config/axiosConfig";

import { User } from "../models/User";
import { endpointUrl } from "../config/endpointConfig";

export const getUser = async (): Promise<User | void> => {
  try {
    const user = await axiosInstance.get<User>(`${endpointUrl}/getUser`);
    return user.data;
  } catch (error) {
    console.error("Error getting user:", error);
  }
};
