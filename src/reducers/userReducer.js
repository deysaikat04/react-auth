import { SET_EMAIL, SET_OTP_VERFIED, RESEND_OTP, CHECK_REFERRAL_CODE, SIGN_UP, SET_ERROR } from "../actions/action-types";

const initState = {
  isLogin: false,
  token: "",
  email: "",
  success: false,
  error: false,
  isOtpVerified: false,
  resendEmailTokenCount: 0,
  isValidReferralCode: false,
  user:{},
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
        isOtpVerified: true,
        error: false,
      };
    case RESEND_OTP:
      return {
        ...state,
        success: action.data.success,
        msg: action.data.message,
        resendEmailTokenCount: action.data.results ? action.data.results.resendEmailTokenCount : 0,
        isOtpVerified: true,
        error: false,
      };
    case CHECK_REFERRAL_CODE:
      return {
        ...state,
        success: action.data.success,
        isValidReferralCode: action.data.success,
        msg: action.data.message,
        error: false,
      };
    case SIGN_UP:
      return {
        ...state,
        success: action.data.success,
        user: action.results.user,
        msg: action.data.message,
        error: false,
      };
    case SET_ERROR:
      return {
        ...state,
        msg: action.data.message,
        isOtpVerified: false,
        error: true,
      };

    default:
      return {
        ...state,
      };
  }
}
