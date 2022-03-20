import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const userFavourites = () => {
  return axios.get(API_URL + "user/favourites", { headers: authHeader() });
};

const userFavouritesAdd = () => {
  return axios.get(API_URL + "user/favourites/add", { headers: authHeader() });
};

const userFavouritesDelete = () => {
    return axios.get(API_URL + "user/favourites/delete", { headers: authHeader() });
};

const userFavouritesCount = () => {
  return axios.get(API_URL + "user/favourites/count", { headers: authHeader() });
};

const favouritesService = {
  userFavourites,
  userFavouritesAdd,
  userFavouritesDelete,
  userFavouritesCount
};

export default favouritesService