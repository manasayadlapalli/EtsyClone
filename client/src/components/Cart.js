import React, { useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Axios from "axios";


import {
  clearCart,
  createCartItem,
  createFinalCart,
  getCartItems,
} from "../features/cartItemsSlice";
import { selectUser } from "../features/userSlice";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";

const CartScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [finalAmount, setFinalAmount] = useState();

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;
  const finalCartProducts = useSelector(getCartItems);
  //console.log("Received final cart Products List:, Here is the data for the 1st Item", finalCartProducts[0]);
  // useEffect(() => {}, []);

  // const removeFromCartHandler = (id) => {
  //   // dispatch(removeFromCart(id));
  // };

  const getCartCount = () => {
    if (finalCartProducts === null) {
      return 0;
    } else {
      return finalCartProducts.reduce((qty, item) => Number(item.qty) + qty, 0);
    }
  };

  const getCartSubTotal = () => {
    if (finalCartProducts === null) {
      return 0;
    } else {
      return finalCartProducts
        .reduce((price, item) => price + item.itemPrice * item.qty, 0)
        .toFixed(2);
    }

    // setFinalAmount(finalPrice);
    // return finalPrice;
  };

  const handleCheckOut = (userId)=> {    
    // finalCartProducts.map((product) => {
    //   Axios.post(`http://localhost:4000/editCount/${product.itemId}`, {
    //     quantity: product.qty,
    //   })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });

    
  
    // for (let i = 0; i < finalCartProducts.length; i++) {
    //   itemId_list.push(finalCartProducts[i].itemId)
    // } 
    // window.location.pathname = "/purchases";
        
    let itemId = null;
    for (let i=0; i<finalCartProducts.length; i++) {
      itemId = finalCartProducts[i].itemId;
      Axios.post("http://localhost:4000/addCartProduct/" + user.id, {
        itemId : itemId,
        orderId: Math.floor(Math.random() * 1000000),
        price: getCartSubTotal(),
      }).then((response) => {
        if (response.data.success === true) {
          console.log("item created in cart");
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    dispatch(clearCart());
    window.location.pathname = "/purchases";

  };

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {finalCartProducts === null ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            finalCartProducts.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                getCartSubTotal={getCartSubTotal}
                getCartCount={getCartCount}
                // qtyChangeHandler={qtyChangeHandler}
                // removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>
        <div
          className="cartscreen__right"
          style={{ marginTop: "80px", width: "30%" }}
        >
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button
              onClick={() => {
                handleCheckOut();
                }}
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
