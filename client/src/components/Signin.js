import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Register from "./register";
import CloseLogin from "./closeLogin";
import { useHistory } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { login, activeUser, activeShop } from "../features/userSlice";
import { backendURL } from "./config.json";

function Signin({ setshowSignIn }) {
  // const history = useHistory();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const [loginStatus, setLoginStatus] = useState(null);

  const dispatch = useDispatch();

  const handleRegister = () => {
    setShowRegister(true);
  };

  Axios.defaults.withCredentials = true;

  const checkUser = (e) => {
    e.preventDefault();

    Axios.post("http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:4000/signin", {
      email: email,
      password: password,
    })
      .then((response) => {
        //console.log(response);
          console.log(response);
          //console.log(response.data._id)
          console.log("In frontend signin");

          dispatch(
            login({
              id: response.data._id,
              email: response.data.email,
              name: response.data.username,
              shopName: response.data.shopName,
              dob: response.data.dob,
              gender: response.data.gender,
              city: response.data.city,
              phoneNumber: response.data.phoneNumber,
              userImage: response.data.userImage,
              about: response.data.about,
              shopImage: response.data.shopImage,
              loggedIn: true,
            })
          );
          window.location.pathname = "/home";
      })
      .catch((err) => {
        setError("Invalid credentials");
      });
  };

  useEffect(() => {
    Axios.get("http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:4000/signin").then((response) => {
      
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user);
        console.log(loginStatus);
            }
    });
  }, []);

  
  return (
    <>
      {/* {redirVal} */}
      <div className="bg-modal">
        <div className="modal-content">
          <CloseLogin setshowSignIn={setshowSignIn} />
          <div className="signin_heading">
            <h4>Sign in</h4>
            <button
              onClick={handleRegister}
              className="register-btn btn-primary">
              Register
            </button>
          </div>
          <form className="signin_form">
            <span style={{ color: "red" }}>{error}</span>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                className="email"
                id="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>

            <div className="htmlForm-group">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                className="password"
                id="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="forgot_password">
              <p className="password_forgot">Forgot your password?</p>
            </div>
            <button
              onClick={checkUser}
              type="submit"
              className="btn btn-primary">
              Sign In
            </button>
          </form>
         </div>
        {showRegister === true && (
          <Register setShowRegister={setShowRegister} />
        )}
      </div>
    </>
  );
}

export default Signin;
