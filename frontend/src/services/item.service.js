import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/shop/";

const getItemHome = () => {
  return axios.get(API_URL + "item");
};

const createItem = () => {
  return axios.post(API_URL + "owner/item", { headers: authHeader() });
};

const updateItem = () => {
    return axios.put(API_URL + "owner/item", { headers: authHeader() });
};

const deleteItem = () => {
    return axios.delete(API_URL + "owner/item", { headers: authHeader() });
};
  
const itemService = {
  getItemHome,
  createItem,
  updateItem,
  deleteItem
};

export default itemService