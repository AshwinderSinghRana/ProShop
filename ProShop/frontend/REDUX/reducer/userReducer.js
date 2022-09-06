import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstatnt";

export function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: "",
      };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: "",
      };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
}

export function userDetailReducer(state = {user:{}}, action) {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state,loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
}

export function userUpdateProfileReducer(state = {user:{}}, action) {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state,loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success:true,
        userInfo: action.payload,
        error: "",
      };
    case USER_UPDATE_PROFILE_FAILURE:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
}
