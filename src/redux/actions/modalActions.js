export const closeModal = (payload) => {
  //   console.log("closeModal");
  return {
    type: "CLOSE_MODAL",
    payload,
  };
};

export const openModal = (payload) => {
  return {
    type: "OPEN_MODAL",
    payload,
  };
};
