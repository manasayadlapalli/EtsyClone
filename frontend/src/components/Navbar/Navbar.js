import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { signout } from "../../slices/auth";
import eventBus from "../../common/EventBus";
import { GrFavorite } from 'react-icons/gr';
import { AiOutlineShop } from 'react-icons/ai';
import { BsPersonCircle, BsCart4 } from 'react-icons/bs';
import { BiLogOut} from 'react-icons/bi';
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import "./styles.css";



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


  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);


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
           
           {/* <li className="nav-item">
            <Link to={"/userprofilepage"} className="nav-link">
               <BsPersonCircle/> {currentUser.username}
            </Link>
          </li> */}

          <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span><BsPersonCircle/> {currentUser.username}</span>
          &emsp;
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <a href="/userprofilepage">User profile</a>
            </li>
            <li>
              <a href="/purchasehistory"> Purchase history</a>
            </li>
            <li>
              <a href="/cart" onClick={signOut}><BiLogOut/> SignOut </a>
            </li>
          </ul>
        </nav>
      </div>
      





          {/* <div>
            <DropdownButton >{currentUser.username}
            
            <li className="nav-item">
          <Link to='/cart'className="nav-link" onClick={signOut}> SignOut </Link> </li>

          <li className="nav-item">
          <Link to={"/userprofilepage"} > User Profile</Link>
          </li>
          <li className="nav-item">
          <Link to='/purchasehistory'>Purchase history</Link>
          </li>

          
          <li>
          <Link to="/signout"><BiLogOut/>Signout</Link>
          </li>

            </DropdownButton>
            </div> */}
            &emsp;
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