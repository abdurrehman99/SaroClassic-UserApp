import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUserReducer";
import { showSnackBarReducer } from "./showSnackBarReducer";
import { artListingReducer } from "./artListingReducer";
import { artistReducer } from "./artistReducer";
import { cartReducer } from "./cartReducer";
import { searchReducer } from "./searchReducer";
import { singleProductReducer } from "./singleProductReducer";
import { regionSelectReducer } from "./regionSelectReducer";
import { singleArtistReducer } from "./singleArtistReducer";
import { inboxReducer } from "./inboxReducer";
import { userOrdersReducer } from "./userOrdersReducer";
import { productsReducer } from "./productsReducer";
import { categoryReducer } from "./categoryReducer";
import { modalReducer } from "./modalReducer";

export default combineReducers({
  currentUser: currentUserReducer,
  showSnackBar: showSnackBarReducer,
  artListing: artListingReducer,
  artist: artistReducer,
  cart: cartReducer,
  products: productsReducer,
  searchResult: searchReducer,
  singleProduct: singleProductReducer,
  region: regionSelectReducer,
  singleArtist: singleArtistReducer,
  inbox: inboxReducer,
  userOrders: userOrdersReducer,
  categories: categoryReducer,
  modal: modalReducer,
});
