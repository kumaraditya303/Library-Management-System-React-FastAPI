import Paper from "@material-ui/core/Paper";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

const HomePage = React.lazy(() => import("./components/Homepage"));
const HomepageAppBar = React.lazy(() => import("./components/HomepageAppBar"));
const IssueBooksPage = React.lazy(() => import("./components/IssueBooksPage"));
const LoginPage = React.lazy(() => import("./components/LoginPage"));
const RegisterPage = React.lazy(() => import("./components/RegisterPage"));

export default function App() {
  return (
    <Paper style={{ height: "auto", minHeight: "100vh" }} square>
      <BrowserRouter>
        <HomepageAppBar />
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>
          <Route exact path="/login/">
            <LoginPage />
          </Route>
          <Route exact path="/register/">
            <RegisterPage />
          </Route>
          <PrivateRoute exact path="/issue/">
            <IssueBooksPage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Paper>
  );
}
