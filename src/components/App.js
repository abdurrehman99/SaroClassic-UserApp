import React, { useEffect, Fragment, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import {
  NavBar,
  Footer,
  RegionSelectModal,
  FullpageLoader,
} from "./CommonComponents";
import {
  fetchArtListingAll,
  fetchArtist,
  setCurrentUser,
  loadCart,
  currentStatusUser,
  getFeaturedProducts,
} from "../redux/actions";
import Success from "./Checkout/Success";
import Failure from "./Checkout/Failure";
import PaypalAfterPayment from "./Checkout/PaypalAfterPayment";
import Crypto from "./Checkout/Crypto";
import jwtDecode from "jwt-decode";

const Home = lazy(() => import("./Home"));
const BuyArt = lazy(() => import("./BuyArt"));
const Account = lazy(() => import("./Account"));
const ListAndSell = lazy(() => import("./Account/ListAndSell"));
const Auction = lazy(() => import("./Auction"));
const AuctionProductPage = lazy(() => import("./Auction/AuctionProductPage"));
const Reserve = lazy(() => import("./Reserve"));
const ReserveProductPage = lazy(() => import("./Reserve/ReserveProductPage"));
const Trading = lazy(() => import("./Trading"));
const TradingProductPage = lazy(() => import("./Trading/TradingProductPage"));
const Artists = lazy(() => import("./Artists"));
const ArtistPage = lazy(() => import("./Artists/ArtistPage"));
const BookNow = lazy(() => import("./Artists/BookNow"));
const Signin = lazy(() => import("./Auth/Signin"));
const Signup = lazy(() => import("./Auth/Signup"));
const ForgotPassword = lazy(() => import("./Auth/ForgotPassword"));
const NotFound = lazy(() => import("./NotFound"));
const Search = lazy(() => import("./Search"));
const Checkout = lazy(() => import("./Checkout"));
function App({
  fetchArtListingAll,
  fetchArtist,
  getFeaturedProducts,
  loadCart,
  status,
  currentStatusUser,
}) {
  useEffect(() => {
    console.log(process.env.NODE_ENV);
    const token = localStorage.getItem("token");
    if (token) {
      // let decodedUser = jwtDecode(token);
      // console.log("==>", decodedUser);
      currentStatusUser(token);
    }
    getFeaturedProducts();
    fetchArtListingAll();
    fetchArtist();
    loadCart();
  }, []);

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <BrowserRouter>
        {/* <RegionSelectModal /> */}
        <NavBar />
        <Suspense fallback={<FullpageLoader />}>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/buyart"
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
            <Route
              exact
              path="/paywithcrypto"
              render={(props) => <Crypto {...props} />}
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
        </Suspense>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

const mapStateToProps = ({ currentUser: { status } }) => ({ status });

export default connect(mapStateToProps, {
  fetchArtListingAll,
  fetchArtist,
  loadCart,
  currentStatusUser,
  getFeaturedProducts,
})(App);
