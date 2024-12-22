import axios from "axios";

import { emptyUser, User } from "../models/User";

export const getUserFromLocalStorage = (): User => {
  const existingUser = localStorage.getItem("user");
  return existingUser ? JSON.parse(existingUser) : emptyUser;
};

export const getUser = async (): Promise<User> => {
  let user = getUserFromLocalStorage();
  if (user.apiKey.length === 0) {
    try {
      const newUser = await axios.get("/generateUser");

      // Access the newUserData and store only id and apiKey in localStorage
      const userData = {
        apiKey: newUser.data.apiKey,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Failed to create new user", error);
      return emptyUser;
    }
  } else {
    return user;
  }
};

export const validateUser = async (user: User) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    const validatedNewUser = await axios.get("/validateUser");
    return validatedNewUser.data;
  } catch {
    throw new Error("Invalid user");
  }
};
