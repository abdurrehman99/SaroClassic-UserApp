import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const { CHAT } = ROUTES;

export const fetchInbox = (id, message) => async dispatch => {
  try {
    const response = await (message
      ? axios.post(`${CHAT}/${id}`, {
          user: id,
          chat: [{ date: new Date().toISOString(), message, sender: "user" }]
        })
      : axios.get(`${CHAT}/${id}`));
    dispatch({
      type: "INBOX",
      payload: response.data.result.chat
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const uploadAttachment = (id, files) => async dispatch => {
  try {
    const formData = new FormData();
    for (const i in Array.from(files)) {
      formData.append("file", files[i]);
    }
    const fileUpload = await axios.post(`${CHAT}/img`, formData);
    const response = await axios.post(`${CHAT}/${id}`, {
      user: id,
      chat: [
        {
          date: new Date().toISOString(),
          type: "img",
          attachment: fileUpload.data.result,
          sender: "user"
        }
      ]
    });
    dispatch({
      type: "INBOX",
      payload: response.data.result.chat
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};
