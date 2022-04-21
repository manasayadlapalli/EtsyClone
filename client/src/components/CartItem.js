import "./CartItem.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFinalCart, removeCartItem } from "../features/cartItemsSlice";
import { Delete } from "@material-ui/icons";
import Axios from "axios";
import { selectUser } from "../features/userSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [gift, SetGift] = useState(false);


  const qtyChangeHandler = (qty) => {
    dispatch(
      createFinalCart({
        itemId: item.itemId,
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemImage: item.itemImage,
        itemPrice: item.itemPrice,
        itemCount: item.itemCount,
        // itemId: item.itemId,
        qty: Number(qty),
      })
    );
    window.location.reload(true);
  };

  const removeHandler = (id) => {
    dispatch(
      removeCartItem({
        itemId: item.itemId,
      })
    );
  };

  const giftMessageHandler = (qty) => {

    console.log("giftMessageHandler");

    Axios.post("http://localhost:4000/giftMessage/" + item._id, {qty} )
      .then((response) => {
        console.log("gift messsage updated");
      })
      .catch((err) => {
        console.log(err);
      });

    // window.location.pathname = "/cart";
  };
  const giftHandler = (gift) => {
    SetGift(true);
  }

  return (
    <div
      className="cart_pag"
      style={{
        display: "flex",
        width: "100%",
        // backgroundColor: "green",
        height: "200px",
      }}
    >
      <div className="cartitem">
        <div className="cartitem__image">
          <img
            src={item.itemImage}
            // src={require("../Images/" + item.itemImage)}
            alt={item.itemName}
            width={150}
            height={100}
          />
        </div>
        <Link to={`/product/${item.product}`} className="cartItem__name">
          <p>{item.itemName}</p>
        </Link>
        <p className="cartitem__price">${Number(item.itemPrice) * Number(item.qty)}</p>
        {console.log("Quantity of Item is " ,item.qty)}
        <select
          value={Number(item.qty)}
          onChange={(e) => qtyChangeHandler(e.target.value)}
          className="cartItem__select"
        >
          {[...Array(Number(item.itemCount)).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
        <button
          className="cartItem__deleteBtn"
          onClick={() => removeHandler(item.itemId)}
        >
          <Delete />
        </button>
        <div>
          <input
            type="checkbox"
            name="giftbox"
            id="checkbox"
            checked={gift}
            value={gift}
            onChange={e => {
              giftHandler(e.target.value);
            }}
          />
          <label for="checkbox"> Gift Card</label>
          {gift && (<div> <input type="gift" id="gift" placeholder="gift message" onChange={(event) => { giftMessageHandler(event.target.value); }} required /></div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default CartItem;
