import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
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
import { AdvertiserEdit } from "./pages/advertiser/edit/AdvertiserEdit";
import { CampaignView } from "./pages/campaigns/view/CampaignView";
import { CampaignList } from "./pages/campaigns/list/CampaignList";
import { CampaignRegister } from "./pages/campaigns/register/CampaignRegister";
import { CampaignEdit } from "./pages/campaigns/edit/CampaignEdit";
import { AdGroupRegister } from "./pages/adGroups/register/AdGroupRegister";
import { AdGroupView } from "./pages/adGroups/view/AdGroupView";
import { AdView } from "./pages/ads/view/AdView";
import { AdRegister } from "./pages/ads/register/AdRegister";
import { CreativeRegister } from "./pages/creatives/register/CreativeRegister";
import { CreativeReplacer } from "./pages/creatives/register/CreativeReplacer";
import { AdGroupEdit } from "./pages/adGroups/edit/AdGroupEdit";
import { AdEdit } from "./pages/ads/edit/AdEdit";

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
            <PrivateRoute
              path="/advertisers/:id/edit"
              children={<AdvertiserEdit />}
            />
            <PrivateRoute path="/campaigns/list" children={<CampaignList />} />
            <PrivateRoute
              path="/campaigns/register"
              children={<CampaignRegister />}
            />
            <PrivateRoute
              path="/campaigns/:id/view"
              children={<CampaignView />}
            />
            <PrivateRoute
              path="/campaigns/:id/edit"
              children={<CampaignEdit />}
            />
            <PrivateRoute
              path="/ad-groups/:id/view"
              children={<AdGroupView />}
            />
            <PrivateRoute
              path="/ad-groups/:id/edit"
              children={<AdGroupEdit />}
            />
            <PrivateRoute
              path="/campaigns/:id/ad-groups/register"
              children={<AdGroupRegister />}
            />
            <PrivateRoute
              path="/ad-groups/:id/ads/register"
              children={<AdRegister />}
            />
            <PrivateRoute path="/ads/:id/view" children={<AdView />} />
            <PrivateRoute path="/ads/:id/edit" children={<AdEdit />} />
            <PrivateRoute
              path="/ads/:id/creative/register"
              children={<CreativeRegister />}
            />
            <PrivateRoute
              path="/ads/:id/creative/replace"
              children={<CreativeReplacer />}
            />
            <PrivateRoute path="/" children={<Dashboard />} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
