import { SET_EMAIL, SET_OTP_VERFIED, RESEND_OTP, SET_ERROR } from "../actions/action-types";

const initState = {
  isLogin: false,
  token: "",
  email: "",
  success: false,
  error: false,
  resendEmailTokenCount: 0,
  msg: "",
};

export default function userReducer(state = initState, action) {
  const { type } = action;
  switch (type) {
    case SET_EMAIL:
      return {
        ...state,
        isLogin: action.data.results ? action.data.results.isLogin : false,
        email: action.email,
        token: action.data.results.token,
        success: action.data.success,
        error: false,
        msg: action.data.message,
      };
    case SET_OTP_VERFIED:
      return {
        ...state,
        isLogin: action.data.results ? action.data.results.isLogin : false,
        success: action.data.success,
        msg: action.data.message,
        resendEmailTokenCount: action.data.resendEmailTokenCount,
        error: false,
      };
    case RESEND_OTP:
      console.log(action.data);
      return {
        ...state,
        success: action.data.success,
        msg: action.data.message,
        resendEmailTokenCount: action.data.results ? action.data.results.resendEmailTokenCount : 0,
        error: false,
      };
    case SET_ERROR:
      return {
        ...state,
        msg: action.data.message,
        error: true,
      };

    default:
      return {
        ...state,
      };
  }
}
