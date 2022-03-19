import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getUserHome = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const deleteUser = () => {
  return axios.delete(API_URL + "user", { headers: authHeader() });
};

const getUserProfile = () => {
  return axios.get(API_URL + "user/profile", { 
    headers: authHeader() 
  })
  .then((response) => {
    return response.data;
  });
};

const createUserProfile = (name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber) => {
  return axios.post(API_URL + "user/profile", {
      headers: authHeader(),
      name,
      address,
      city,
      zipcode,
      country,
      image, 
      description, 
      gender, 
      dateofbirth, 
      phonenumber
    });
};

const updateUserProfile = (name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber) => {
    return axios.put(API_URL + "user/profile", { 
      headers: authHeader(),
      name,
      address,
      city,
      zipcode,
      country,
      image, 
      description, 
      gender, 
      dateofbirth, 
      phonenumber
    });
};

const getUserPurchases = () => {
    return axios.get(API_URL + "user/purchases", { 
      headers: authHeader() 
    })
    .then((response) => {
      return response.data;
    });
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