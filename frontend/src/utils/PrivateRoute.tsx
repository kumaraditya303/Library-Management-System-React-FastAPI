import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { RootState } from "../store";
interface Props {
  children: React.ReactNode;
  [x: string]: any;
}
const PrivateRoute = ({ children, ...rest }: Props) => {
  const authenticated =
    useSelector((state: RootState) => state.auth.token) !== null;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
export default PrivateRoute;
