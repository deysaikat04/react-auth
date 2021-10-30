import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "./Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import { verifyCodeAsync, resendCodeAsync } from "../actions/userAction";

const Verify = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    if (user.resendEmailTokenCount === 3) {
      setTimeout(() => history.push("/"), 2000);
    }
    user.error || user.msg ? setOpen(true) : setOpen(false);
       
    setSuccess(user.success);
  }, [user]);

  const handleChange = (e) => {
    const { value } = e.target;
    setOtp(value);
    if (value.length === 0 || value.length < 6) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      email: user.email,
      token: user.token.toString(),
      verificationCode: otp.toString(),
    };
    setOtp("");
    setBtnActive(false);
    dispatch(verifyCodeAsync(payload));
  };

  const resend = () => {
    let payload = {
      email: user.email,
      token: user.token.toString()
    };
    setOtp("");
    setBtnActive(false);
    dispatch(resendCodeAsync(payload));
  }

  console.log(user);
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px",
          padding: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography component="p" variant="body2" sx={{ mb: 3 }}>
            Please enter the OTP sent to your email.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                autoFocus
                required
                fullWidth
                variant="outlined"
                id="otp"
                label="OTP"
                name="otp"
                autoComplete="otp"
                onChange={handleChange}
                value={otp}
                inputProps={{
                  maxLength: 6,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                disabled={!btnActive}
              >
                {loading ? <CircularProgress color="inherit" /> : "Verify"}
              </Button>
            </Grid>
          </Grid>

          <hr />

          <Grid container justifyContent="center">
            <Grid item sx={{ mt: 3, mr: 2 }}>
              <Button
                variant="text"
                onClick={() => history.push("/")}
                color="secondary"
              >
                Go back
              </Button>
            </Grid>
            <Grid item sx={{ mt: 3, ml: 2 }}>
              <Button variant="text" onClick={resend}>Resend OTP</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {open && (
        <Alert
          setOpen={setOpen}
          type={success ? "success" : "error"}
          errorMsg={user.msg ? user.msg : "Network error!"}
        />
      )}
    </Container>
  );
};

export default Verify;
