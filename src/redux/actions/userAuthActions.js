import { ROUTES } from "../../utils/api/routes";
import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
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

export const currentStatusUser = (token) => async (dispatch) => {
  try {
    const response = await axios.post(GET_USER_FROM_TOKEN, {
      token,
    });
    dispatch(setCurrentUser(response.data.user));
  } catch (error) {
    console.log("token not found ==> logout user", error.response);
    dispatch(logoutUser());
    showSnackBar("Session Expired !", "error");
  }
};
