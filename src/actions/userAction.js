import axios from "axios";
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
} from "./action-types";

export const verifyEmailAsync = (data) => {
  let url = `${process.env.REACT_APP_BASE_URL}/users/email`;
  return (dispatch) => {
    axios
      .post(url, data)
      .then((res) => {        
        dispatch(verifyEmail(res.data, data.email));
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.status > 200) {
            dispatch(setError(error.message));
          }
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError(error.message));
        }
      });
  };
};

export const verifyCodeAsync = (data) => {
  let url = `${process.env.REACT_APP_BASE_URL}/users/email/verify`;
  return (dispatch) => {
    axios
      .put(url, data)
      .then((res) => {
        dispatch(verifyCode(res.data, data.email));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError(error.message));
        }
      });
  };
};

export const resendCodeAsync = (data) => {
  let url = `${process.env.REACT_APP_BASE_URL}/users/token/resendtoken`;
  return (dispatch) => {
    axios
      .put(url, data)
      .then((res) => {
        dispatch(verifyResendCode(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError(error.message));
        }
      });
  };
};

export const checkReferralCodeAsync = (data) => {
  let url = `${process.env.REACT_APP_BASE_URL}/users/referral/${data}`;
  return (dispatch) => {
    axios
      .get(url)
      .then((res) => {
        dispatch(checkReferralCode(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError(error.message));
        }
      });
  };
};

export const userSignUpAsync = (data) => {
  let url = `${process.env.REACT_APP_BASE_URL}/users`;
  return (dispatch) => {
    axios
      .post(url, data)
      .then((res) => {
        console.log("Action: ", res.data);
        dispatch(signUp(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError(error.message));
        }
      });
  };
};

export const userLogOutAsync = (data) => {
  let url = `${process.env.REACT_APP_BASE_URL}/users/logout/${data.userId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${data.userId},${data.userToken}`,
    },
  };
  return (dispatch) => {
    axios
      .post(url, data, config)
      .then((res) => {
        dispatch(logOut(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError(error.message));
        }
      });
  };
};

export const verifyEmail = (data, email) => {
  return {
    type: SET_EMAIL,
    data,
    email,
  };
};

export const verifyCode = (data) => {
  return {
    type: SET_OTP_VERFIED,
    data,
  };
};

export const verifyResendCode = (data) => {
  return {
    type: RESEND_OTP,
    data,
  };
};

export const checkReferralCode = (data) => {
  return {
    type: CHECK_REFERRAL_CODE,
    data,
  };
};

export const resetReferralCode = () => {
  return {
    type: RESET_REFERRAL_CODE,
  };
};

export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

export const logOut = (data) => {
  return {
    type: LOG_OUT,
    data,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const setError = (data) => {
  console.log(data);
  return {
    type: SET_ERROR,
    data,
  };
};
