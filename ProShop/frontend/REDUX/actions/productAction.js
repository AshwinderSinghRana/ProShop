import { httpGet } from "../../config/AxiosConfig";
import {
  PRODUCT_LISTS_REQUEST,
  PRODUCT_LISTS_FAILURE,
  PRODUCT_LISTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
} from "../constants/productConstants";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LISTS_REQUEST });

    const { data } = await httpGet("/product/getAll");

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
    const { data } = await httpGet(`/product/getProduct/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    await httpGet.delete(
      `/product/removeProduct/${id}`,

      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      }
    );
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await httpGet.post(
      `/product`,
      {},

      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { listProducts, detailProducts, deleteProduct, createProduct };
