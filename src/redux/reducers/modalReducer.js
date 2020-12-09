export const modalReducer = (state = false, { type, payload }) => {
  switch (type) {
    case "CLOSE_MODAL":
      return payload;
    default:
      return state;
  }
};
