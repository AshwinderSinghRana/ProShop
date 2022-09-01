import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { productDetailReducer, productListReducer } from '../reducer/productReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import { cartReducer } from "../reducer/cartReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart:cartReducer
  
});

const cartItemFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []


const initialState = {

  cart:{cartItems:cartItemFromStorage}
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
