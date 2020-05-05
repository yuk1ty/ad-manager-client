import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { SessionRepository } from "../../context/session";

interface PrivateRouteProps {
  path: string;
  children: React.ReactNode;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = (props) => {
  const repository = SessionRepository();

  const isAuth = repository.isAuthorized();

  return isAuth ? (
    <Route path={props.path}>{props.children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};
