import { createStore, combineReducers } from "redux";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import cartItemsReducer from "../features/cartItemsSlice";
import productReducer from "../features/productsSlice";
import purchaseReducer from "../features/purchaseSlice";
import cartItemsSlice from "../features/cartItemsSlice";
import {
  persistStore,
  persistCombineReducers,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-key58",
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  cartItem: cartItemsReducer,
  finalcart:cartItemsSlice,
  purchase: purchaseReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

export const persistor = persistStore(store);