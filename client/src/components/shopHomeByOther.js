import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProducts,
  getUserId,
  userDetails,
  userId,
} from "../features/shopSlice";
import { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
// import ShopHeader from "./shopHeader";
import ShopHeaderByOther from "./shopHeaderByOther";
import ShopHomeOtherUser from "./shopHomeOtherUser";

function shopHomeByOther() {
  const { id } = useParams(); //itemId
  const [userIdFromSearch, setUserIdFromSearch] = useState();
  const user = useSelector(selectUser);

  const [userInfo, setUserInfo] = useState("");
  const [itemsByUser, setItemsByUser] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  useEffect(() => {
    getUserIdFromItemId();
    getItemsFromUserid();
    getUserDetails();
    // setTimeout(() => {
    //   getItemsFromUserid();
    // }, 2000);

    // setTimeout(() => {
    //   userDetails();
    // }, 3000);
  });
 
  const getUserIdFromItemId = () => {
    Axios.get("http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:4000/getItemById/" + id).then((response) => {
      if (response) {
        dispatch(userId(response.data.userId));
        console.log("GET USER ID FROM ITEMID", response.data)

      }
    });
  };

  const getItemsFromUserid = () => {
    Axios.get("http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:4000/getItemsBasedOnUser/" + user.id).then(
      (response) => {
        if (response) {
          console.log(response);
          // setUserInfo();
          dispatch(createProducts(response.data.result));
          console.log("Items based on other user",response.data.result);
        }
      }
    );
  };

  const getUserDetails = () => {
    Axios.get("http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:4000/getShopById/" + userId).then(
      (response) => {
        if (response) {
          console.log(response);
          // setUserInfo(response.data.result[0]);
          dispatch(userDetails(response.data.result));
          // console.log(response.data.result.name);
          console.log("Get  shop by id",response.data);
        }
      }
    );
  };

  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <h1>{userIdFromSearch}</h1>

      <ShopHeaderByOther />
      <ShopHomeOtherUser />

      {/* shop home header  */}
    </div>
  );
}

export default shopHomeByOther;
