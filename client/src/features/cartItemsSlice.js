import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartItems: [],
    finalCart: [],
  },
  reducers: {
   
    createCartItem: (state, action) => {      

      if (state.cartItems == null) {
        state.cartItems = []
      }
      
      state.cartItems.push(action.payload);
    },

    removeCartItem: (state, action) => {

      console.log ("Clicked Delete Button");
      console.log(action)

      const index = state.cartItems.findIndex(
        (ele) => ele._id === action.payload.itemId
      );

      console.log ("Need to delete item at this index", index);

      state.cartItems.splice(index, 1);
      // state.cartItems.splice(action.payload, 1);
      // const item = state.cartItems.filter(
      //   (ele) => ele.itemId === action.payload
      // );
      //   state.cartProducts = null;
      // console.log(item + "----------------------------: deleted");
    },
    
    clearCart: (state) => {
      state.cartItems = [];
   },

    updateCartItem: (state, action) => {
      state.cartItems = action.payload;
    },

    createFinalCart: (state, action) => {
      const exist = state.cartItems.findIndex(
        (ele) => ele.itemId === action.payload.itemId
      );
      console.log(exist + "--: exist");
      if (exist !== -1) {
        state.cartItems[exist] = {
          ...state.cartItems[exist],
          ...action.payload,
        };
      } else {
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const {
  createCartItem,
  removeCartItem,
  updateCartItem,
  createFinalCart,
  clearCart,
} = cartItemsSlice.actions;

export const getCartItems = (state) => state.cartItem.cartItems;
export const getFinalCart = (state) => state.cart.finalCart;

export default cartItemsSlice.reducer;
