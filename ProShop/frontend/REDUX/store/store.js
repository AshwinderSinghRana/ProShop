import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
} from "../reducer/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "../reducer/cartReducer";
import {
  getUserByAdminDetails,
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "../reducer/userReducer";
import {
  orderCreateReducer,
  orderDetailReducer,
  orderListMyReducer,
  orderPayReducer,
} from "../reducer/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userByAdmin: getUserByAdminDetails,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  paymentMethod: paymentMethodFromStorage,
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
