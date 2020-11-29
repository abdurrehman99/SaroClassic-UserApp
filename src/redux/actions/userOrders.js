import { ROUTES } from "../../utils/api/routes";
import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";

export const userOrders = () => async (dispatch) => {
  try {
    const response = await axios.get(ROUTES.USER_GET_ORDERS);
    dispatch({
      type: "USER_GET_ORDERS",
      payload: response.data.orders,
    });
  } catch (e) {
    console.log(e);
    showSnackBar("Failed to fetch Orders History !", "error");
  }
};
