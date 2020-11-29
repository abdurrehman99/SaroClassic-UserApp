import { ROUTES } from "../../utils/api/routes";
import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { setCurrentUser } from "./userAuthActions";
const { USER_UPDATE_PROFILE, USER_UPDATE_PASSWORD } = ROUTES;

export const updateProfile = (values) => async (dispatch) => {
  try {
    const res = await axios.put(USER_UPDATE_PROFILE, values);
    dispatch(setCurrentUser(res.data.user));
    showSnackBar("Profile Updated Successfully !", "success");
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.error : "An Error Occurred",
      "error"
    );
  }
};

export const updatePassword = (values, history) => async (dispatch) => {
  try {
    await axios.put(USER_UPDATE_PASSWORD, values);
    showSnackBar("Password Updated Successfully !", "success");
    history.push("/");
  } catch (e) {
    console.log(e.response);
    showSnackBar(
      e.response ? e.response.data.error : "An Error Occurred",
      "error"
    );
  }
};
