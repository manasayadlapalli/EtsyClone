import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const signUp = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const signIn = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const signOut = () => {
  localStorage.removeItem("user");
};

const authService = {
  signUp,
  signIn,
  signOut,
};

export default authService;