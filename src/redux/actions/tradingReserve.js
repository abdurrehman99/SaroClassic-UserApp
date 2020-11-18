import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";
import { fetchSingleProduct } from "./fetchSingleProduct";
const { ART_TRADE_BUY_SHARE } = ROUTES;

export const buyTradingShares = (units, sellerId, productId) => async (
  dispatch
) => {
  try {
    let response = await axios.post(
      `${ART_TRADE_BUY_SHARE}/${productId}`,
      { sellerId, units: parseInt(units) },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    switch (response.data.result) {
      case "No Unit left":
        throw "No Units Left";
        break;
      case "Buy Successfully":
        fetchSingleProduct(productId, "trading")(dispatch);
        dispatch({
          type: "ART_SINGLE_PRODUCT",
          payload: response.data.result,
        });
        showSnackBar("Purchase Successful", "success");
        break;
      default:
        throw "Error";
        break;
    }
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const sell = (units, sellerId, productId) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${ART_TRADE_BUY_SHARE}/${productId}`,
      { sellerId, units: parseInt(units) },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    switch (response.data.result) {
      case "No Unit left":
        throw "No Units Left";
        break;
      case "Buy Successfully":
        fetchSingleProduct(productId, "trading")(dispatch);
        dispatch({
          type: "ART_SINGLE_PRODUCT",
          payload: response.data.result,
        });
        showSnackBar("Purchase Successful", "success");
        break;
      default:
        throw "Error";
        break;
    }
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};
