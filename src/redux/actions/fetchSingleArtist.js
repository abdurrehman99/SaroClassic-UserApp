import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { ARTIST_GET_BY_ID } = ROUTES;

export const fetchSingleArtist = (id, artist) => async dispatch => {
  if (artist) {
    dispatch({
      type: "ARTIST_SINGLE",
      payload: artist
    });
  } else {
    try {
      let response = await axios.get(`${ARTIST_GET_BY_ID}/${id}`);
      dispatch({
        type: "ARTIST_SINGLE",
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
