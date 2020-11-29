import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { FEATURED_PRODUCTS } = ROUTES;

export const getFeaturedProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(FEATURED_PRODUCTS);
    dispatch({
      type: "SET_FEATURED_PRODUCTS",
      payload: response.data.products,
    });
  } catch (e) {
    showSnackBar("Fail to fetch featured products", "error");
  }
};
