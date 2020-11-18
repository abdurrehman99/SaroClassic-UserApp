export const artistReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "ARTIST_GET":
      return payload;
    default:
      return state;
  }
};
