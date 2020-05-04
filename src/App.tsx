import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";
import { UserList } from "./pages/users/UserList";
import { UserRegister } from "./pages/users/register/UserRegister";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { UserEdit } from "./pages/users/edit/UserEdit";
import { AgencyList } from "./pages/agencies/list/AgencyList";
import { AgencyEdit } from "./pages/agencies/edit/AgencyEdit";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "light", // TODO あとで変えたい
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/users/list">
              <UserList />
            </Route>
            <Route path="/users/register">
              <UserRegister />
            </Route>
            <Route path="/users/:id/edit" component={UserEdit} />
            <Route path="/agencies/list">
              <AgencyList />
            </Route>
            <Route path="/agencies/:id/edit" component={AgencyEdit} />
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
