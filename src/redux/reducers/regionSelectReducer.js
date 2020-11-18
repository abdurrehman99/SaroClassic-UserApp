export const regionSelectReducer = (state = "", action) => {
  switch (action.type) {
    case "REGION_SELECT":
      return action.payload;
    default:
      return state;
  }
};
