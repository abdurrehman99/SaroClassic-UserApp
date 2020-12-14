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
import Success from "./Checkout/Success";
import Failure from "./Checkout/Failure";
import PaypalAfterPayment from "./Checkout/PaypalAfterPayment";

import Home from "./Home";
import BuyArt from "./BuyArt";
import Account from "./Account";
import ListAndSell from "./Account/ListAndSell";
import Auction from "./Auction";
import AuctionProductPage from "./Auction/AuctionProductPage";
import Reserve from "./Reserve";
import ReserveProductPage from "./Reserve/ReserveProductPage";
import Trading from "./Trading";
import TradingProductPage from "./Trading/TradingProductPage";
import Artists from "./Artists";
import ArtistPage from "./Artists/ArtistPage";
import BookNow from "./Artists/BookNow";
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
            path="/allProducts"
            render={(props) => <BuyArt {...props} />}
          />
          <Route
            exact
            path="/buyart/:id"
            render={(props) => <BuyArt {...props} />}
          />
          <Route
            exact
            path="/masterpiece"
            render={(props) => <BuyArt {...props} masterpiece />}
          />
          <Route
            exact
            path="/masterpiece/:id"
            render={(props) => <BuyArt {...props} masterpiece />}
          />
          <Route
            exact
            path="/auction"
            render={(props) => <Auction {...props} />}
          />
          <Route
            exact
            path="/auction/:id"
            render={(props) => <AuctionProductPage {...props} />}
          />
          <Route
            exact
            path="/reserve"
            render={(props) => <Reserve {...props} />}
          />
          <Route
            exact
            path="/reserve/:id"
            render={(props) => <ReserveProductPage {...props} />}
          />
          <Route
            exact
            path="/trading"
            render={(props) => <Trading {...props} />}
          />
          <Route
            exact
            path="/trading/:id"
            render={(props) => <TradingProductPage {...props} />}
          />
          <Route
            exact
            path="/artists"
            render={(props) => <Artists {...props} />}
          />
          <Route
            exact
            path="/artists/booknow"
            render={(props) => <BookNow {...props} />}
          />
          <Route
            exact
            path="/artists/:id"
            render={(props) => <ArtistPage {...props} />}
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
          <Route
            exact
            path="/paypal/:status"
            render={(props) => <PaypalAfterPayment {...props} />}
          />
          <Route
            exact
            path="/success"
            render={(props) => <Success {...props} />}
          />
          <Route
            exact
            path="/failure"
            render={(props) => <Failure {...props} />}
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
              <Route
                exact
                path="/listandsell"
                render={(props) => <ListAndSell {...props} />}
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
