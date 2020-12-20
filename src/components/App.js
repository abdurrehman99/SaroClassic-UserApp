import React, { useEffect, Fragment, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { NavBar, Footer } from "./CommonComponents";
import {
  loadCart,
  currentStatusUser,
  getFeaturedProducts,
} from "../redux/actions";

import Home from "./Home";
import BuyArt from "./BuyArt";
import Men from "./Men";
import Account from "./Account";
import ListAndSell from "./Account/ListAndSell";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";
import NotFound from "./NotFound";
import Search from "./Search";
import Checkout from "./Checkout";
function App({ getFeaturedProducts, loadCart, status, currentStatusUser }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      currentStatusUser(token);
    }
    getFeaturedProducts();
    loadCart();
  }, []);

  return (
    <Container maxWidth="xl" style={{ padding: 0, margin: 0 }}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/women-collection"
            render={(props) => <BuyArt {...props} />}
          />
          <Route
            exact
            path="/men-collection"
            render={(props) => <Men {...props} />}
          />

          <Route
            exact
            path="/signin"
            render={(props) => <Signin {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route
            exact
            path="/forgotpassword"
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            exact
            path="/search"
            render={(props) => <Search {...props} />}
          />
          <Route
            exact
            path="/checkout"
            render={(props) => <Checkout {...props} />}
          />

          {status === "loggedIn" && (
            <Fragment>
              {/* <Route
                  exact
                  path="/inbox"
                  render={(props) => <Inbox {...props} />}
                /> */}
              <Route
                exact
                path="/account"
                render={(props) => <Account {...props} />}
              />
            </Fragment>
          )}
          <Route render={(props) => <NotFound {...props} />} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

const mapStateToProps = ({ currentUser: { status } }) => ({ status });

export default connect(mapStateToProps, {
  loadCart,
  currentStatusUser,
  getFeaturedProducts,
})(App);
