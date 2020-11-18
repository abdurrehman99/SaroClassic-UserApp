import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { ARTISTS } = ROUTES;

export const fetchArtist = () => async dispatch => {
  try {
    const response = await axios.get(ARTISTS);
    dispatch({
      type: "ARTIST_GET",
      payload: response.data.result
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};
