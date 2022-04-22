import Axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem } from "../features/cartItemsSlice";
import {
  addProductToCart,
  addQtyToCart,
  getAllCartProducts,
  getFinalCartProducts,
} from "../features/cartSlice";
import userSlice, { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
import "./ProductOverView.css";
import { getCartItems } from "../features/cartItemsSlice";
import { useParams } from "react-router-dom";

function ProductView() {
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const productView = useSelector(getAllCartProducts);
  // const cartProduct = useSelector(getAllCartProducts);
  // const cartItems = useSelector(getCartItems);

  const addToCartHandler = () => {

    dispatch(
      createCartItem({
        itemId: productView.itemId,
        itemName: productView.itemName,
        itemDescription: productView.itemDescription,
        itemImage: productView.itemImage,
        itemPrice: productView.itemPrice,
        itemCount: productView.itemCount,
        itemId: productView.itemId,
        qty: Number(qty),
      })
    );
  };
  
  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <h1>{id}</h1>

    </>
  );
}

export default ProductView;
