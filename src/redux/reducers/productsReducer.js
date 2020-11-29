export const productsReducer = (
  state = {
    featuredProducts: [],
    allProducts: [],
  },
  { type, payload }
) => {
  switch (type) {
    case "SET_FEATURED_PRODUCTS":
      return { ...state, featuredProducts: payload };
    case "SET_ALL_PRODUCTS":
      return { ...state, allProducts: payload };

    default:
      return state;
  }
};
