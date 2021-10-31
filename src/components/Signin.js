import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import { verifyEmailAsync, reset } from "../actions/userAction";

const useStyles = makeStyles((theme) => ({
  box: {
    boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#ffffff",
  },
}));

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState({ email: false });
  const [formErrorMsg, setFormErrorMsg] = useState({ email: "" });
  const [btnEnabled, setBtnEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    user.error || user.msg ? setOpen(true) : setOpen(false);
    if (user.authed) history.push("/profile");
  }, [user]);

  const handleChange = (e) => {
    const { value } = e.target;
    let regex = /^\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    setEmail(value);

    if (regex.test(value)) {
      setFormError({ ...formError, email: false });
      setFormErrorMsg({ ...formErrorMsg, email: "" });
      setBtnEnabled(true);
    } else {
      setFormError({ ...formError, email: true });
      setFormErrorMsg({ ...formErrorMsg, email: "Invalid email!!" });
      setBtnEnabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      email,
    };
    setLoading(true);
    dispatch(verifyEmailAsync(payload));
    history.push("/verify");
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box className={classes.box}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography component="p" variant="body2" sx={{ mb: 3 }}>
            Please enter your email to continue.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                variant="outlined"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={email}
                {...(formError.email && {
                  error: true,
                  helperText: formErrorMsg.email,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
                disabled={!btnEnabled}
              >
                {loading ? <CircularProgress color="inherit" /> : "Get OTP"}
              </Button>
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
};

export default SignIn;
