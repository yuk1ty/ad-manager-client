import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

interface PrivateRouteProps {
  path: string;
  children: React.ReactNode;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = (props) => {
  const [cookies] = useCookies([""]);

  const isAuth = cookies["x-adm-session"] !== undefined;

  return isAuth ? (
    <Route path={props.path}>{props.children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};
