import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Cookies from "js-cookie";
import { logOut } from "../actions/userAction";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = Cookies.get("token");
  const authed = token !== undefined;

  const hanndleLogout = () => {
    dispatch(logOut());
    Cookies.remove("token", { path: "/" });
    window.location.pathname = "/";
  };

  if (!authed) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            example.com
          </Typography>

          <Button
            variant="link"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => history.push("/home")}
          >
            Table
          </Button>
          <Button
            variant="link"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => history.push("/upload")}
          >
            Upload
          </Button>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={hanndleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
