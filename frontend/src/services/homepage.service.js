import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const getHomePage = () => {
  return axios.get(API_URL + "home");
};

const homepageService = {
  getHomePage
};

export default homepageService