export const searchReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "SEARCH_RESULT":
      return payload;
    default:
      return state;
  }
};
