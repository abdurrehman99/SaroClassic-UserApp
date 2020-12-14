export const modalReducer = (state = false, { type, payload }) => {
  // console.log("reducer", type, payload);

  switch (type) {
    case "CLOSE_MODAL":
      return payload;
    case "OPEN_MODAL":
      return payload;
    default:
      return state;
  }
};
