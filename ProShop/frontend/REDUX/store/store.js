import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { productDetailReducer, productListReducer } from '../reducer/productReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
  productList: productListReducer,
  productDetail:productDetailReducer
  
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
