import axios from "axios";
import { showSnackBar } from "../../components/CommonComponents";
import { ROUTES } from "../../utils/api/routes";
import { region } from "../../utils/api/routes";

const {
  ART_GET_ALL,
  ART_GET_GENERAL,
  ART_GET_MASTERPIECE,
  ART_GET_AUCTION,
  ART_GET_RESERVES,
  ART_GET_TRADING,
} = ROUTES;

export const fetchArtListingAll = (pageNo = 1, filter) => async (dispatch) => {
  try {
    const response = await (filter
      ? axios.post(`${ART_GET_ALL}&page=${pageNo - 1}`, { filter })
      : axios.get(`${ART_GET_ALL}&page=${pageNo - 1}`));
    dispatch({
      type: "ART_LISTING_ALL",
      payload: response.data.result.data,
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const fetchArtListingGeneral = (pageNo = 1, filter) => async (
  dispatch
) => {
  try {
    const response = await (filter
      ? axios.post(`${ART_GET_GENERAL}&page=${pageNo - 1}`, { filter })
      : axios.get(`${ART_GET_GENERAL}&page=${pageNo - 1}`));
    dispatch({
      type: "ART_GET_GENERAL",
      payload: response.data.result,
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const fetchArtListingMasterpiece = (pageNo = 1, filter) => async (
  dispatch
) => {
  try {
    const response = await (filter
      ? axios.post(`${ART_GET_MASTERPIECE}&page=${pageNo - 1}`, { filter })
      : axios.get(`${ART_GET_MASTERPIECE}&page=${pageNo - 1}`));
    dispatch({
      type: "ART_GET_MASTERPIECE",
      payload: response.data.result,
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const fetchArtListingAuction = (pageNo = 1, filter) => async (
  dispatch
) => {
  try {
    const response = await (filter
      ? axios.post(`${ART_GET_AUCTION}${region()}&page=${pageNo - 1}`, {
          filter,
        })
      : axios.get(`${ART_GET_AUCTION}${region()}&page=${pageNo - 1}`));
    dispatch({
      type: "ART_GET_AUCTION",
      payload: response.data.result,
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const fetchArtListingReserves = (pageNo = 1, filter) => async (
  dispatch
) => {
  try {
    const response = await (filter
      ? axios.post(`${ART_GET_RESERVES}?page=${pageNo - 1}`, { filter })
      : axios.get(`${ART_GET_RESERVES}?page=${pageNo - 1}`));
    dispatch({
      type: "ART_GET_RESERVES",
      payload: response.data.result,
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};

export const fetchArtListingTrading = (pageNo = 1, filter) => async (
  dispatch
) => {
  try {
    const response = await (filter
      ? axios.post(`${ART_GET_TRADING}?page=${pageNo - 1}`, { filter })
      : axios.get(`${ART_GET_TRADING}?page=${pageNo - 1}`));
    dispatch({
      type: "ART_GET_TRADING",
      payload: response.data.result,
    });
  } catch (e) {
    showSnackBar(
      e.response ? e.response.data.responseMessage : "An Error Occurred",
      "error"
    );
  }
};
