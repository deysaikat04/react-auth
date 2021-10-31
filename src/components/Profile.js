import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  return (
    <React.Fragment>
      <Navbar />
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
          <Grid container spacing={5} alignItems="flex-start">
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    component="h1"
                    variant="h5"
                    color="text.primary"
                    sx={{
                        mb:3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    Welcome
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography component="p" color="text.primary">
                    Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Typography component="p" color="text.primary">
                    {user.profile.firstName} {user.profile.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography component="p" color="text.primary">
                    Mobile:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Typography component="p" color="text.primary">
                    {user.profile.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography component="p" color="text.primary">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Typography component="p" color="text.primary">
                    {user.profile.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
