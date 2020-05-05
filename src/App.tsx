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
import { AgencyRegister } from "./pages/agencies/register/AgencyRegister";
import { GuestRoute } from "./pages/routing/GuestRoute";
import { PrivateRoute } from "./pages/routing/PrivateRoute";
import { AdvertiserList } from "./pages/advertiser/list/AdvertiserList";
import { AdvertiserView } from "./pages/advertiser/view/AdvertiserView";
import { AdvertiserRegister } from "./pages/advertiser/register/AdvertiserRegister";

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
            <GuestRoute path="/login" children={<Login />} />
            <PrivateRoute path="/users/list" children={<UserList />} />
            <PrivateRoute path="/users/register" children={<UserRegister />} />
            <PrivateRoute path="/users/:id/edit" children={<UserEdit />} />
            <PrivateRoute path="/agencies/list" children={<AgencyList />} />
            <PrivateRoute
              path="/agencies/register"
              children={<AgencyRegister />}
            />
            <PrivateRoute path="/agencies/:id/edit" children={<AgencyEdit />} />
            <PrivateRoute
              path="/advertisers/list"
              children={<AdvertiserList />}
            />
            <PrivateRoute
              path="/advertisers/register"
              children={<AdvertiserRegister />}
            />
            <PrivateRoute
              path="/advertisers/:id/view"
              children={<AdvertiserView />}
            />
            <PrivateRoute path="/" children={<Dashboard />} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
