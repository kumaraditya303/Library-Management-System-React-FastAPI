import Paper from "@material-ui/core/Paper";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/Homepage";
import HomepageAppBar from "./components/HomepageAppBar";
import IssueBooksPage from "./components/IssueBooksPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PrivateRoute from "./utils/PrivateRoute";
export default function App() {
  return (
    <Paper style={{ height: "auto", minHeight: "100vh" }} square>
      <BrowserRouter>
        <HomepageAppBar />
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>
          <Route exact path="/login/" component={LoginPage}></Route>
          <Route exact path="/register/" component={RegisterPage}></Route>
          <PrivateRoute exact path="/issue/">
            <IssueBooksPage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Paper>
  );
}
