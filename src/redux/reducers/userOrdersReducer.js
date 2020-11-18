export const userOrdersReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "USER_GET_ORDERS":
      return payload;
    default:
      return state;
  }
};
