import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { ART_GET_BY_ID, ART_AUCTION_GET_BY_ID, ART_GET_RESERVES } = ROUTES;

export const fetchSingleProduct = (
  id,
  page = "general",
  product
) => async dispatch => {
  if (product) {
    dispatch({
      type: "ART_SINGLE_PRODUCT",
      payload: product
    });
  } else {
    try {
      let response;
      switch (page) {
        case "general":
          response = await axios.get(`${ART_GET_BY_ID}${id}`);
          break;
        case "auction":
          response = await axios.get(`${ART_AUCTION_GET_BY_ID}${id}`);
          break;
        case "reserve":
          response = await axios.get(`${ART_GET_RESERVES}/${id}?trade=false`);
          break;
        case "trading":
          response = await axios.get(`${ART_GET_RESERVES}/${id}?trade=true`);
          break;
        default:
          break;
      }
      dispatch({
        type: "ART_SINGLE_PRODUCT",
        payload: response.data.result
      });
    } catch (e) {
      showSnackBar(
        e.response ? e.response.data.responseMessage : "An Error Occurred",
        "error"
      );
    }
  }
};
