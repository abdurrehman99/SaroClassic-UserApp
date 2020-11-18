export const showSnackBarReducer = (state, { type, payload }) => {
  switch (type) {
    case "SHOW_SNACKBAR":
      return {
        message: payload.message,
        type: payload.type,
        open: payload.open
      };
    case "CLOSE_SNACKBAR":
      return { ...state, open: false };
    default:
      return { open: false };
  }
};
