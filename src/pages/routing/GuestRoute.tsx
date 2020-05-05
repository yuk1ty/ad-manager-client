import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { SessionRepository } from "../../context/session";

interface GuestRouteProps {
  path: string;
  children: React.ReactNode;
}

export const GuestRoute: FunctionComponent<GuestRouteProps> = (props) => {
  const repository = SessionRepository();

  const isAuth = repository.isAuthorized();

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Route path={props.path}>{props.children}</Route>
  );
};
