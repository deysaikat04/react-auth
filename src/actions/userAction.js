import axios from "axios";
import {
  SET_EMAIL,
} from "./action-types";

export const verifyEmailAsync = (data) => {  
  let url = `${process.env.REACT_APP_BASE_URL}/users/email`;  
  return (dispatch) => {
    axios
      .post(url, data)
      .then((res) => {
        let d = new Date();
        d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
        document.cookie =
          "token=" + res.data.results.token + ";expires=" + d.toUTCString() + ";path=/";
        dispatch(verifyEmail(res.data, data.email));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(verifyEmail(error.response.data.message));
        } else {
          dispatch(verifyEmail(error.message));
        }
      });
  };
};
export const verifyCodeAsync = (data) => {  
  let url = `${process.env.REACT_APP_BASE_URL}/users/email/verify`;  
  return (dispatch) => {
    axios
      .post(url, data)
      .then((res) => {
        let d = new Date();
        d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
        document.cookie =
          "token=" + res.data.results.token + ";expires=" + d.toUTCString() + ";path=/";
        dispatch(verifyEmail(res.data, data.email));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(verifyEmail(error.response.data.message));
        } else {
          dispatch(verifyEmail(error.message));
        }
      });
  };
};

export const verifyEmail = (data, email) => {
  return {
    type: SET_EMAIL,
    data,
    email
  };
};
export const verifyCode = (data) => {
  return {
    type: SET_EMAIL,
    data
  };
};