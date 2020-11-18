export const artListingReducer = (
  state = {
    all: [],
    general: [],
    masterpiece: [],
    auction: [],
    reserves: [],
    trading: [],
    filter: []
  },
  { type, payload }
) => {
  let _filter = payload
    ? payload.filter !== undefined
      ? { filter: payload.filter }
      : {}
    : {};

  switch (type) {
    case "ART_LISTING_ALL":
      return { ...state, all: payload, filter: [] };
    case "ART_GET_GENERAL":
      return { ...state, general: payload.data, ..._filter };
    case "ART_GET_MASTERPIECE":
      return { ...state, masterpiece: payload.data, ..._filter };
    case "ART_GET_AUCTION":
      return { ...state, auction: payload.data, ..._filter };
    case "ART_GET_RESERVES":
      return { ...state, reserves: payload, ..._filter };
    case "ART_GET_TRADING":
      return { ...state, trading: payload, ..._filter };
    default:
      return state;
  }
};
