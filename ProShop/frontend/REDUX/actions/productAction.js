import { httpGet } from "../../config/AxiosConfig";
import {
  PRODUCT_LISTS_REQUEST,
  PRODUCT_LISTS_FAILURE,
  PRODUCT_LISTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
} from "../constants/productConstants";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LISTS_REQUEST });

    const { data } = await httpGet("/products");

    dispatch({
      type: PRODUCT_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LISTS_FAILURE,
      payload: error,
    });
  }
};

const detailProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await httpGet(`products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: error,
    });
  }
};

export { listProducts, detailProducts };
