import {
  SET_EMAIL,
  SET_OTP_VERFIED,
  RESEND_OTP,
  CHECK_REFERRAL_CODE,
  RESET_REFERRAL_CODE,
  SIGN_UP,
  LOG_OUT,
  RESET,
  SET_ERROR,
} from "../actions/action-types";

const initState = {
  isLogin: false,
  token: "",
  email: "",
  success: false,
  error: false,
  isOtpVerified: false,
  resendEmailTokenCount: 0,
  wrongEmailTokenCount: 0,
  isValidReferralCode: false,
  authed: false,
  profile: {},
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
        resendEmailTokenCount: action.data.messageObj
          ? action.data.messageObj.resendEmailTokenCount
          : 0,
        wrongEmailTokenCount: action.data.messageObj
          ? action.data.messageObj.wrongEmailTokenCount
          : 0,
        profile: action.data.results ? action.data.results.user : {},
        authed:
          action.data.success && action.data.results
            ? action.data.results.user
              ? true
              : false
            : false,
        isOtpVerified: true,
        error: false,
      };
    case RESEND_OTP:
      return {
        ...state,
        success: action.data.success,
        msg: action.data.message,
        resendEmailTokenCount: action.data.results
          ? action.data.results.resendEmailTokenCount
          : state.resendEmailTokenCount + 1,
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
    case RESET_REFERRAL_CODE:
      return {
        ...state,
        isValidReferralCode: false,
        msg: "",
      };
    case SIGN_UP:
      return {
        ...state,
        success: action.data.success,
        profile: action.data.results ? { ...action.data.results.user } : {},
        msg: action.data.message,
        authed: action.data.results ? true : false,
        error: action.data.results ? true : false,
      };
    case SET_ERROR:
      return {
        ...state,
        msg: action.data,
        isOtpVerified: false,
        error: true,
      };

    case RESET: {
      return {
        ...state,
        isOtpVerified: false,        
      };
    }

    case LOG_OUT: {
      return {
        ...state,
        ...initState,
        success: action.data.success,
        msg: action.data.message,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
