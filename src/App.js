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
import Profile from "./components/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} authed={authed} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

function App() {
  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Signin {...props} />} />
          <Route
            exact
            path="/verify"
            render={(props) => <Verify {...props} />}
          />
          <PrivateRoute
            exact
            path="/signup"
            authed={user.isOtpVerified}
            component={Signup}
          />
          <PrivateRoute
            exact
            path="/profile"
            authed={user.authed}
            component={Profile}
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
