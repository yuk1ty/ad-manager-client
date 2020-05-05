import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

interface GuestRouteProps {
  path: string;
  children: React.ReactNode;
}

export const GuestRoute: FunctionComponent<GuestRouteProps> = (props) => {
  const [cookies] = useCookies([""]);

  const isAuth = cookies["x-adm-session"] !== undefined;

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Route path={props.path}>{props.children}</Route>
  );
};
