import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES, region } from "../../utils/api/routes";

const { SEARCH } = ROUTES;

export const search = term => async dispatch => {
  if (!term.length) {
    dispatch({
      type: "SEARCH_RESULT",
      payload: []
    });
  } else {
    try {
      const response = await axios.get(SEARCH, {
        params: {
          term,
          region: region()
        }
      });
      dispatch({
        type: "SEARCH_RESULT",
        payload: response.data.result
      });
    } catch (e) {
      showSnackBar(
        e.response ? e.response.data.responseMessage : "An Error Occurred",
        "error"
      );
    }
  }
};
