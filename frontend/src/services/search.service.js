import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const search = () => {
  return axios.get(API_URL + "search");
};

const searchInShop = () => {
  return axios.get(API_URL + "search/shop", { headers: authHeader() });
};

const searchUserFavourites = () => {
    return axios.get(API_URL + "search/user/favourites", { headers: authHeader() });
};

const searchService = {
  search,
  searchInShop,
  searchUserFavourites
};

export default searchService