import {
  SET_EMAIL,
} from "../actions/action-types";

const initState = {
  isLogin: false,
  token: "",
  email: "",
  success: false,
  error: false,
  msg: "",
};

export default function userReducer(state = initState, action) {
  const { type } = action;
  switch (type) {
    case SET_EMAIL:
      return {
        ...state,
        isLogin: action.data.results.isLogin,
        email: action.email,
        token: action.data.results.token,
        success: true,
        error: false,
        msg: action.data.message,
      };

    default:
      return {
        ...state,
      };
  }
}
