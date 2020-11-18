import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { ART_GET_RESERVES, ART_RESERVES_BUY_EQUITY } = ROUTES;

export const buyEquityReserve = (productId, qty) => async dispatch => {
  try {
    let response = await axios.post(
      `${ART_RESERVES_BUY_EQUITY}/${productId}`,
      { units: parseInt(qty) },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    switch (response.data.result) {
      case "No Unit left":
        throw "No Units Left";
        break;
      case "Buy Successfully":
        response = await axios.get(
          `${ART_GET_RESERVES}/${productId}?trade=false`
        );
        dispatch({
          type: "ART_SINGLE_PRODUCT",
          payload: response.data.result
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
