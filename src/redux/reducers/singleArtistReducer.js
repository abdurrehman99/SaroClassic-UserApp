export const singleArtistReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "ARTIST_SINGLE":
      return payload;
    default:
      return state;
  }
};
