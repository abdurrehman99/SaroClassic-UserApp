import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { FEATURED_PRODUCTS, ALL_PRODUCTS } = ROUTES;

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

export const getAllProducts = (category, limit) => async (dispatch) => {
  let URL;
  category ? (URL = `${ALL_PRODUCTS}?q=${category}`) : (URL = ALL_PRODUCTS);
  try {
    const response = await axios.get(URL);
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: response.data.products,
    });
    dispatch({
      type: "SET_CATEGORIES",
      payload: response.data.categories,
    });
  } catch (e) {
    showSnackBar("Fail to fetch products", "error");
  }
};

export const getMenProducts = (category, limit) => async (dispatch) => {
  let URL;
  category ? (URL = `${ALL_PRODUCTS}?q=${category}`) : (URL = ALL_PRODUCTS);
  try {
    const response = await axios.get(URL);
    dispatch({
      type: "SET_MEN_PRODUCTS",
      payload: response.data.products,
    });
    dispatch({
      type: "SET_CATEGORIES",
      payload: response.data.categories,
    });
  } catch (e) {
    showSnackBar("Fail to fetch products", "error");
  }
};
