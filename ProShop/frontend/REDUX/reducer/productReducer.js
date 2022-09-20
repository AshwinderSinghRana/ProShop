import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_LISTS_REQUEST,
  PRODUCT_LISTS_SUCCESS,
  PRODUCT_LISTS_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_RESET,
} from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LISTS_REQUEST:
      return { loading: true, products: [], error: "" };

    case PRODUCT_LISTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };

    case PRODUCT_LISTS_FAILURE:
      return { loading: false, error: action.payload, products: [] };

    default:
      return state;
  }
}

function productDetailReducer(state = { product: [] }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, product: [] };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, error: "" };

    case PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: action.payload, product: [] };

    default:
      return state;
  }
}

function productDeleteReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, error: "" };

    case PRODUCT_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

function productCreateReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESs:
      return {
        loading: false,
        success: true,
        error: "",
        product: action.payload,
      };

    case PRODUCT_CREATE_FAILURE:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
}
export {
  productDetailReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
};
