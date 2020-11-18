export const totalCartReducer = (state = 0, { type, payload }) => {
  switch (type) {
    // case "TOTAL_CART_ADD_PRODUCT":
    //   return state + payload.price;
    // case "TOTAL_CART_REMOVE_PRODUCT":
    //   return state - payload.price;
    default:
      return state;
  }
};
