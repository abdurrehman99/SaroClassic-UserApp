export const showSnackBar = (message, type) => {
  return {
    type: "SHOW_SNACKBAR",
    payload: { message, type, open: true }
  };
};
export const closeSnackBar = () => {
  return {
    type: "CLOSE_SNACKBAR"
  };
};
