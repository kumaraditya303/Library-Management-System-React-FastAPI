import "@fontsource/roboto";
import { CircularProgress, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <Suspense fallback={<CircularProgress />}>
        <App />
      </Suspense>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
