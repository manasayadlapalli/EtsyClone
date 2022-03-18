import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getUserHome = () => {
  return axios.get(API_URL + "user");
};

const deleteUser = () => {
  return axios.delete(API_URL + "user", { headers: authHeader() });
};

const getUserProfile = () => {
  return axios.get(API_URL + "user/profile", { headers: authHeader() });
};

const createUserProfile = () => {
  return axios.post(API_URL + "user/profile", { headers: authHeader() });
};

const updateUserProfile = () => {
    return axios.put(API_URL + "user/profile", { headers: authHeader() });
};

const getUserPurchases = () => {
    return axios.get(API_URL + "user/purchases", { headers: authHeader() });
};
  
const userService = {
  getUserHome,
  deleteUser,
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  getUserPurchases
};

export default userService