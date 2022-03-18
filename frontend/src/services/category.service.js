import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getCategory = () => {
  return axios.get(API_URL + "category");
};
  
const categoryService = {
  getCategory
};

export default categoryService