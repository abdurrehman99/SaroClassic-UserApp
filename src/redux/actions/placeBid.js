import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { ART_GET_AUCTION } = ROUTES;

export const placeBid = (id, userId, amount) => async dispatch => {
  try {
    const response = await axios.put(`${ART_GET_AUCTION}/${id}`, {
      bids: {
        bidder: userId,
        bid: amount
      }
    });
    dispatch({
      type: "ART_SINGLE_PRODUCT",
      payload: response.data.result
    });
    showSnackBar(response.data.responseMessage, "success");
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};
