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
  console.log("Pr", authed);
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

const App = (props) => {
  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const authed = user.authed;

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
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          {/* <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} authed={user.authed} />}
          /> */}
          {/* <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} />}
          />          */}
          <PrivateRoute
            exact
            path="/profile"
            authed={authed}
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
};

export default App;
