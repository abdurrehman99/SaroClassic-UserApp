import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUserReducer";
import { showSnackBarReducer } from "./showSnackBarReducer";
import { artListingReducer } from "./artListingReducer";
import { artistReducer } from "./artistReducer";
import { cartReducer } from "./cartReducer";
import { totalCartReducer } from "./totalCartReducer";
import { searchReducer } from "./searchReducer";
import { singleProductReducer } from "./singleProductReducer";
import { regionSelectReducer } from "./regionSelectReducer";
import { singleArtistReducer } from "./singleArtistReducer";
import { inboxReducer } from "./inboxReducer";
import { userOrdersReducer } from "./userOrdersReducer";

export default combineReducers({
  currentUser: currentUserReducer,
  showSnackBar: showSnackBarReducer,
  artListing: artListingReducer,
  artist: artistReducer,
  cart: cartReducer,
  totalCart: totalCartReducer,
  searchResult: searchReducer,
  singleProduct: singleProductReducer,
  region: regionSelectReducer,
  singleArtist: singleArtistReducer,
  inbox: inboxReducer,
  userOrders: userOrdersReducer,
});
