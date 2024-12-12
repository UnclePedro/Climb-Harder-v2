import axios from "../config/axiosConfig";
import { emptyUser, User } from "../models/User";

export const getUserFromLocalStorage = (): User => {
  const existingUser = localStorage.getItem("user");
  return existingUser ? JSON.parse(existingUser) : emptyUser;
};

export const getUser = async (): Promise<User> => {
  let user = getUserFromLocalStorage();

  if (user.id === 0) {
    try {
      const newUser = await axios.post("/generateUser");

      console.log("New user is:", newUser);

      // Access the newUserData and store only id and apiKey in localStorage
      const userData = {
        id: newUser.data.id,
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
