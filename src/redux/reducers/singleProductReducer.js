export const singleProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "ART_SINGLE_PRODUCT":
      return payload;
    default:
      return state;
  }
};
