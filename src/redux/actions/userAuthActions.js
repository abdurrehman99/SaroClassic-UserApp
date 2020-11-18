import { ROUTES } from "../../utils/api/routes";
import axios from "axios";
const { USER_GET_USER_FROM_TOKEN } = ROUTES;

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  };
};
export const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: "LOGOUT_USER"
  };
};
export const currentStatusUser = _ => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(USER_GET_USER_FROM_TOKEN, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setCurrentUser(response.data.result));
    } else {
      dispatch(logoutUser());
    }
  } catch (e) {
    dispatch(logoutUser());
  }
};
