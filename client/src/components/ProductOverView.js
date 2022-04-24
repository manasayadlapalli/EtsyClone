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
import { Link } from "react-router-dom";

function ProductOverView() {
  const [qty, setQty] = useState(1);
  const [maxQty, setMaxQty] = useState(10);
  const productView = useSelector(getAllCartProducts);
  const [totalPrice, setTotalPrice] = useState(productView.itemPrice);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [addToCartMessage, setAddToCart] = useState("");

  const qtyChangeHandler = (newQty) => {
    
    console.log(newQty)
    setTotalPrice(Number(productView.itemPrice) * Number(newQty));
    setQty(Number(newQty))
  }

  const addToCartHandler = (itemId, userId) => {

    dispatch(
      createCartItem({
        itemId: productView._id,
        itemName: productView.itemName,
        itemDescription: productView.itemDescription,
        itemImage: productView.itemImage,
        itemPrice: productView.itemPrice,
        itemCount: productView.itemCount,
        qty: Number(qty),
      })
    );
    window.location.pathname = "/cart";

  };
  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>

      <h3
        style={{
          textAlign: "center",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {addToCartMessage}
      </h3>

      <div className="productscreen">
        <div className="productscreen__left">
          <div className="left__image">
            <img
              src={productView.itemImage}
              alt={productView.itemName}
              //   height={300}
              width={450}
            />
          </div>

          <div className="left__info">
            <p className="left__name">{productView.itemName}</p>
            <p>Price: ${productView.itemPrice}</p>
            <p>Description: {productView.itemDescription}</p>
            <p>
              <Link to={`/shopHomeForOthers/${productView.itemId}`}>
                Shop Home
              </Link>
            </p>
          </div>
        </div>
        <div className="productscreen__right">
          <div className="right__info">
            <p>
              Price:
              <span>${totalPrice}</span>
            </p>
            <p>
              Status:
              <span>
                {productView.itemCount > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <p>
              Qty
            <select  value={qty} onChange={(e) => qtyChangeHandler(e.target.value)}>
              {[...Array(Number(productView.itemCount)).keys()].map((x) => (<option key={x+1} value={x+1}> {x+1} </option>))}
            </select> 
              
              {/* <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(productView.itemCount).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select> */}
              
            </p>
            <p>
              <button type="button" onClick={addToCartHandler}>
                Add To Cart
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductOverView;
