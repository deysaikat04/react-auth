import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import { userLogOutAsync } from "../actions/userAction";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    if (user.profile) {
      let length = Object.keys(user.profile).length;
      if (length) {
        setUserId(user.profile._id);
        setUserToken(user.profile.token);
      }
    }
  }, [user]);

  const hanndleLogout = () => {
    const payload = {
      userId,
      userToken,
    };
    dispatch(userLogOutAsync(payload));
    window.location.pathname = "/";
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            example.com
          </Typography>
          {user.profile && (
            <Avatar alt="Remy Sharp" src={user.profile.avatar} />
          )}
          {user.profile && (
            <Typography sx={{ my: 1, mx: 1.5 }}>
              {user.profile.firstName}
            </Typography>
          )}
          <Button
            color="secondary"
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
