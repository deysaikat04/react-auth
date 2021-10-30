import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Verify from "./components/Verify";
import Profile from "./components/Profile";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Signin {...props} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} />} />
          <Route exact path="/verify" render={(props) => <Verify {...props} />} />
          <Route exact path="/profile" render={(props) => <Profile {...props} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
