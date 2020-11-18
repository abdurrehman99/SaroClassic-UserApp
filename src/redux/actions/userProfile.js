import { ROUTES } from "../../utils/api/routes";
import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { currentStatusUser } from "./userAuthActions";
const { USER_UPDATE_PROFILE, USER_UPDATE_PASSWORD } = ROUTES;

export const updateProfile = (values) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.put(USER_UPDATE_PROFILE, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      currentStatusUser()(dispatch);
      showSnackBar("Profile Updated Successfully", "success");
    } else {
      showSnackBar("User Not Avialable", "error");
    }
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const updatePassword = (values) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.put(USER_UPDATE_PASSWORD, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      currentStatusUser()(dispatch);
      showSnackBar("Password Updated Successfully", "success");
    } else {
      showSnackBar("User Not Avialable", "error");
    }
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};
