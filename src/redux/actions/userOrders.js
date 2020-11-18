import { ROUTES } from "../../utils/api/routes";
import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";

export const userOrders = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(ROUTES.USER_GET_ORDERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "USER_GET_ORDERS",
        payload: response.data.result,
      });
    } else {
      showSnackBar("User Not Avialable", "error");
    }
  } catch (e) {
    console.log(e);
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};
