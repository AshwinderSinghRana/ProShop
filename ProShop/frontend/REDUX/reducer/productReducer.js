import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_LISTS_REQUEST,
  PRODUCT_LISTS_SUCCESS,
  PRODUCT_LISTS_FAILURE,
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
export { productDetailReducer, productListReducer };
