import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import { signout } from "../../slices/auth";
import eventBus from "../../common/EventBus";

const Navbar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signOut = useCallback(() => {
    dispatch(signout());
  }, [dispatch]);

  useEffect(() => {
    eventBus.on("signout", () => {
      signout();
    });

    return () => {
      eventBus.remove("signout");
    };
  }, [currentUser, signOut]);


  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        MyEtsy
      </Link>
      <div className="navbar-nav mr-auto">
     {currentUser && (
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              User
            </Link>
          </li>
        )}
      </div>
            
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={signOut}>
              SignOut
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/signin"} className="nav-link">
              SignIn
            </Link>
          </li>
       <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              SignUp
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;