import axios from "axios";
import { emptyUser, User } from "../models/User";

export const getUserFromLocalStorage = (): User => {
  const existingUser = localStorage.getItem("user");
  return existingUser ? JSON.parse(existingUser) : emptyUser;
};

export const getUser = async (): Promise<User> => {
  let user = getUserFromLocalStorage();

  if (user.id === 0) {
    try {
      const newUser = await axios.post<User>(
        "http://localhost:8080/generateUser"
      );

      localStorage.setItem("user", JSON.stringify(newUser.data));
      console.log("New user is:", newUser);
      return newUser.data;
    } catch (error) {
      console.error("Failed to create new user");
      return emptyUser;
    }
  } else {
    return user;
  }
};
