import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { signout } from "../../slices/auth";
import eventBus from "../../common/EventBus";
import Favorites from "../Favorites/Favorites";
import {GrFavorite} from 'react-icons/gr';
import {AiOutlineShop} from 'react-icons/ai';
import {BsPersonCircle,BsCart4} from 'react-icons/bs';
import RegisterShop from "../UserShopRegister/RegisterShop";


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
    <nav className="navbar navbar-expand navbar-light">
      &emsp;
      <Link to='/'><img src ={"https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg"} alt = "logo" width="84" height="43"/></Link>&emsp;&emsp;
      <div className="form-group col-md-4">
      <input type='text' className='searchbar' placeholder='Search for anything'></input>
      </div>       
      {currentUser ? (
        <div className="Nav1">
        <div className="navbar-nav ml-auto">
            <li className="nav-item">
          <Link to='/favorites' ><GrFavorite size={22} /></Link>
          </li>&emsp;
          <li className="nav-item">
          <Link to='/registerShop'><AiOutlineShop size={25}/></Link>
           </li>&emsp;
           
           <li className="nav-item">
            <Link to={"/userprofilepage"} className="nav-link">
               <BsPersonCircle/> {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={signOut}>
              SignOut
            </a> &emsp;
          </li>
          <li className="nav-item">
          <Link to='/cart'><BsCart4 color="black" size={22} /></Link>
          </li>

        </div>
        </div>
      ) : (
        <div className="Nav1">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;