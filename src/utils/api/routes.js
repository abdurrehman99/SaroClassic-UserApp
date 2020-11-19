export const region = (short) => {
  let region = localStorage.getItem("region") || "af";
  return short ? region : `?region=${region}`;
};
const SERVER_URL = "https://africanart-international-serve.herokuapp.com";
const BASE_URL = "https://saroclassic-server.herokuapp.com";

const USER_ROUTES = `${SERVER_URL}/user`;
const ART_ROUTES = `${SERVER_URL}/arts`;
const ART_CATEGORY_ROUTES = `${ART_ROUTES}${region()}&category=`;
const STATIC = `${SERVER_URL}/static`;
const ART_AUCTION_ROUTES = `${SERVER_URL}/auction`;
const ART_RESERVES_ROUTES = `${SERVER_URL}/reserves`;

export const ROUTES = {
  //AuthRoutes
  USER_REGISTER: `${USER_ROUTES}/register`,
  USER_LOGIN: `${BASE_URL}/user/login`,

  USER_VERIFY: `${USER_ROUTES}/verify`,
  USER_GET_USER_FROM_TOKEN: USER_ROUTES,
  USER_UPDATE_PROFILE: `${USER_ROUTES}?account_type=user`,
  USER_UPDATE_PASSWORD: `${USER_ROUTES}/update_password`,
  USER_GET_ORDERS: `${USER_ROUTES}/order`,

  //ForgotPassword
  USER_FORGOT_SEND_CODE: `${USER_ROUTES}/sendCode`,
  USER_FORGOT_VERIFY_CODE: `${USER_ROUTES}/verifyCode`,
  USER_FORGOT_RESET_PASSWORD: `${USER_ROUTES}/resetProfilePassword`,
  //ArtProducts
  ART_GET_ALL: `${ART_CATEGORY_ROUTES}all`,
  ART_GET_GENERAL: `${ART_CATEGORY_ROUTES}general`,
  ART_GET_MASTERPIECE: `${ART_CATEGORY_ROUTES}masterpiece`,
  ART_GET_AUCTION: ART_AUCTION_ROUTES,
  //GetSingleProductUsingID
  ART_GET_BY_ID: `${ART_ROUTES}${region()}&productId=`,
  ART_AUCTION_GET_BY_ID: `${ART_AUCTION_ROUTES}${region()}&productId=`,
  //AuctionRoutes
  ART_AUCTION_GET_HIGHEST_BIDDER: `${ART_AUCTION_ROUTES}/top_bid/`,
  //Reserves Route
  ART_GET_RESERVES: ART_RESERVES_ROUTES,
  ART_RESERVES_BUY_EQUITY: `${ART_RESERVES_ROUTES}/buyEquity`,
  ART_TRADE_BUY_SHARE: `${ART_RESERVES_ROUTES}/buyShare`,
  ART_TRADE_SELL_SHARE: `${ART_RESERVES_ROUTES}/tradeShare`,
  //Trading
  ART_GET_TRADING: `${ART_RESERVES_ROUTES}/trade`,
  //Images
  STATIC_IMG: `${STATIC}/img`,
  UPLOAD_IMG: `${SERVER_URL}/img`,
  //Artist
  ARTISTS: `${USER_ROUTES}/artist${region()}`,
  ARTIST_GET_BY_ID: `${USER_ROUTES}`,
  //listSell
  LIST_SELL_SUBMIT_REQUEST: `${SERVER_URL}/list_sell`,
  //Portrait Orders
  ORDER_PORTRAIT: `${SERVER_URL}/portrait_orders`,
  //ChatRoute
  CHAT: `${SERVER_URL}/chat`,
  //Search
  SEARCH: `${SERVER_URL}/search`,
  //payment
  PAYMENT_PAYPAL_GET_PAYMENT_URL: `${SERVER_URL}/paypal/createPayment`,
  PAYMENT_PAYPAL_SUCCESS_URL: `${SERVER_URL}/paypal/success`,
  PAYMENT_STRIPE_CAPTURE_URL: `${SERVER_URL}/stripe`,
  ORDER_ADD_ORDER: `${SERVER_URL}/orders`,
};

export const cloudinary = {
  url: "https://api.cloudinary.com/v1_1/xord-pvt-ltd/image/upload",
  uploadPreset: "j3plnemu",
};
