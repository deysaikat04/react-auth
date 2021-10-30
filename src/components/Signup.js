import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "./Alert";
import { checkReferralCodeAsync, userSignUpAsync } from "../actions/userAction";
import { signUpConstants } from "../actions/constants";

export default function SignUp() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const [name, setName] = useState("example");
  const [referral, setReferral] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const [formError, setFormError] = useState({ name: false });
  const [formErrorMsg, setFormErrorMsg] = useState({ name: "" });

  const [btnEnabled, setBtnEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user.error || user.msg ? setOpen(true) : setOpen(false);
    isValidate();
  }, [user]);

  const handleReferralCodeChange = (e) => {
    const { value } = e.target;

    value === "" ? setBtnEnabled(true) : setBtnEnabled(false);

    let uppercaseChars = value.replace(/[^A-Z0-9]/g, function (match) {
      if (match != undefined) {
        return match.toUpperCase();
      }
    });
    setReferral(uppercaseChars);
    if (uppercaseChars.length === 6) {
      dispatch(checkReferralCodeAsync(uppercaseChars));
    }
  };

  const isValidate = (id, value) => {
    if (
      id === "firstName" &&
      value !== "" &&
      privacyChecked &&
      (referral === "" || user.isValidReferralCode)
    ) {
      setBtnEnabled(true);
    } else if (
      id === "privacyChecked" &&
      value &&
      name !== "" &&
      (referral === "" || user.isValidReferralCode)
    ) {
      setBtnEnabled(true);
    } else if (user.isValidReferralCode && privacyChecked && name !== "") {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
  };

  const handleNameChange = (e) => {
    const { id, value } = e.target;
    setName(value);
    if (value === "") {
      setFormError({ ...formError, name: true });
      setFormErrorMsg({ ...formErrorMsg, name: "This field is required" });
    } else {
      setFormError({ ...formError, name: false });
      setFormErrorMsg({ ...formErrorMsg, name: "" });
    }
    isValidate(id, value);
  };

  const handlePrivacyChange = (e) => {
    const { id, checked } = e.target;
    setPrivacyChecked(checked);
    isValidate(id, checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      firstName: name,
      email: user.email,
      referredCodeKey: referral,
      agreeToPrivacyPolicy: privacyChecked,
      token: user.token,
      source: signUpConstants.APPSOURCE,
    };
    dispatch(userSignUpAsync(payload));
  };
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={user.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={name}
                onChange={handleNameChange}
                autoFocus
                {...(formError.name && {
                  error: true,
                  helperText: formErrorMsg.name,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="referredCodeKey"
                label="Referral Code"
                id="referredCodeKey"
                autoComplete="referred-code"
                inputProps={{
                  maxLength: 6,
                }}
                value={referral}
                onChange={handleReferralCodeChange}
                helperText="Referral code is optional. Please enter a valid code or leave it blank."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="privacyChecked"
                    checked={privacyChecked}
                    onChange={handlePrivacyChange}
                    color="primary"
                  />
                }
                label="I Agree to Privacy Policy."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            disabled={!btnEnabled}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {open && (
        <Alert
          setOpen={setOpen}
          type={user.success ? "success" : "error"}
          errorMsg={user.msg ? user.msg : "Network error!"}
        />
      )}
    </Container>
  );
}
