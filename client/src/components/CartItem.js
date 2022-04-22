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

  const giftMessageHandler = (giftMessage) => {
    dispatch(
      createFinalCart({
        itemId: item.itemId,
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemImage: item.itemImage,
        itemPrice: item.itemPrice,
        itemCount: item.itemCount,
        giftMessage: giftMessage,
      })
    );
  };



  const giftHandler = (gift) => {
    SetGift(true);
  }
  // console.log('ITEM ID IS ',item.itemId)

  return (
    <div
      className="cart_pag"
      style={{
        display: "flex",
        width: "100%",
        height: "200px",
      }}
    >
      <div className="cartitem">
        <div className="cartitem__image">
          <img
            src={item.itemImage}
            alt={item.itemName}
            width={150}
            height={100}
          />
        </div>
        <Link to={`/product/${item.product}`} className="cartItem__name">
          <p>{item.itemName}</p>
        </Link>
        <p className="cartitem__price">${Number(item.itemPrice) * Number(item.qty)}</p>
        {/* {console.log("Quantity of Item is " ,item.qty)} */}
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
          <label for="checkbox"> Gift Wrap</label>
          {gift && (<div> <input type="gift" id="gift" placeholder="Gift message" onChange={(event) => { giftMessageHandler(event.target.value); }} required /></div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default CartItem;
