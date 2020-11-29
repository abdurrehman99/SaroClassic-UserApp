import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from "./components/App";
import reducers from "./redux/reducers";
import { SnackBar } from "./components/CommonComponents/";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1c1c1c" },
    secondary: { main: "#7a7a7a" },
  },
  typography: {
    fontFamily: "Montserrat",
    color: "black",
    fontSize: 13,
  },
});

export const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : null
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <SnackBar />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
