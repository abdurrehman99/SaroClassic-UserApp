export const categoryReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "SET_CATEGORIES":
      return payload;

    default:
      return state;
  }
};
