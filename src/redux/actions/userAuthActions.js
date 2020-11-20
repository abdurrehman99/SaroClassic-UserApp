import { ROUTES } from "../../utils/api/routes";
import axios from "axios";
const { GET_USER_FROM_TOKEN } = ROUTES;

export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
};
export const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: "LOGOUT_USER",
  };
};
export const currentStatusUser = (_) => async (dispatch) => {
  console.log("currentStatusUser == >");
  const token = localStorage.getItem("token");
  console.log("token", token);
  if (token) {
    const response = await axios.get(GET_USER_FROM_TOKEN, {
      token,
    });
    console.log("response", response);
    dispatch(setCurrentUser(response.data.user));
  } else {
    console.log("token else");

    dispatch(logoutUser());
  }
};
