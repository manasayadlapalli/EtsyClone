import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getShopPublic = () => {
  return axios.get(API_URL + "shop");
};

const getShopOwner = () => {
  return axios.get(API_URL + "shop/owner", { headers: authHeader() });
};

const createShop = () => {
  return axios.post(API_URL + "shop/owner", { headers: authHeader() });
};

const updateShop = () => {
    return axios.put(API_URL + "shop/owner", { headers: authHeader() });
};

const deleteShop = () => {
    return axios.delete(API_URL + "shop/owner", { headers: authHeader() });
};
  
const shopService = {
  getShopPublic,
  getShopOwner,
  createShop,
  updateShop,
  deleteShop
};

export default shopService