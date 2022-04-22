import React from "react";
import {
  ShoppingCart,
  Person,
  NotificationsNoneSharp,
  FavoriteBorderSharp,
} from "@material-ui/icons";
import cookie from "react-cookies";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import {
  removeAllItemsFromHome,
  removeFavouritesList,
  removeProductsState,
} from "../features/productsSlice";

function profileList({ setShowProfileLists }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const showHomePage = () => {
    setShowProfileLists(false);
  };

  const loadProfilePage = () => {
    navigate("/profile");
  };
  const loadPurchasePage = ()=> {
    navigate("/purchases");
  }

  const handleSellOnEtsy = () => {
    navigate("/sellonetsy");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    console.log("In sign out");
    dispatch(logout());
    dispatch(removeProductsState());
    dispatch(removeFavouritesList());
    // dispatch(removeAllItemsFromHome());
    console.log("In sign out 1");
    // navigate("/");
    cookie.remove("user", { path: "/" });
    window.location.pathname = "/";
  };

  // let redirectVar = null;
  // if (!user) {
  //   console.log("cookie is found " + user);
  //   redirectVar = <Navigate to="/home" />;
  // }
  return (
    <div>
      
      <div onClick={showHomePage} className="profile-modal">
        <div className="profile-content">
          {/* <CloseLogin setshowSignIn={setshowSignIn} /> */}

          <ul className="profile-icons">
            <li onClick={loadProfilePage} className="profile-icon">
              <b>{cookie.load("user")}</b>
              <br />
              <span style={{ fontSize: "14px" }}>My profile</span>
            </li>
             <li onClick={loadPurchasePage} className="profile-icon">
              <span style={{ fontSize: "14px" }}>My Purchases</span>
              </li>
             <li onClick={handleSellOnEtsy} className="profile-icon">
              Sell on Etsy
            </li>
            <li onClick={handleSignOut} className="profile-icon">
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profileList;
