import "./CartItem.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFinalCart, removeCartItem } from "../features/cartItemsSlice";
import { Delete } from "@material-ui/icons";
import {BsGift} from "react-icons/bs";

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
        <div className="gift_message">
          <img
            src={item.itemImage}
            alt={item.itemName}
            width={150}
            height={210}
          />
        </div>
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
          <label className="checkbox" for="checkbox"> This order is a gift <BsGift/></label>
          {gift && (<div> <input type="gift" id="gift" placeholder="Add gift message for free" onChange={(event) => { giftMessageHandler(event.target.value); }} required /></div>
          )}
        </div>
       <div> 
        <Link to={`/product/${item.product}`} className="cartItem__name">
          <p>{item.itemName}</p>
        </Link>       
       
        <p className="cartitem__price">${Number(item.itemPrice)}</p>
        </div>
        <div>
        <select
          value={Number(item.qty)}
          onChange={(e) => qtyChangeHandler(e.target.value)}
          className="cartItem__select"
        >
          {[...Array(Number(item.itemCount) + 1).keys()].map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        </div>
        <div>
        <button
          className="cartItem__deleteBtn"
          onClick={() => removeHandler(item.itemId)}
        >
          <Delete />
        </button>
        </div>
        {/* <div>
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
          <label className="checkbox" for="checkbox"> This order is a gift <BsGift/></label>
          {gift && (<div> <input type="gift" id="gift" placeholder="Add gift message for free" onChange={(event) => { giftMessageHandler(event.target.value); }} required /></div>
          )}
        </div> */}
        
      </div>
    </div>
  );
};

export default CartItem;
