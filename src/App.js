import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Verify from "./components/Verify";
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Profile = lazy(() => import("./components/Profile"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#344955",
    },
    secondary: {
      main: "#f9aa33",
    },
  },
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.authed === true ? (
          <Component {...props} authed={rest.authed} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const App = () => {
  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route exact path="/" render={(props) => <Signin {...props} />} />
          <Route
            exact
            path="/verify"
            render={(props) => <Verify {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <PrivateRoute
            component={Profile}
            exact
            path="/profile"
            authed={user.authed}
          />
          <Route
            exact
            path="*"
            render={(props) => (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
            )}
          />
        </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
