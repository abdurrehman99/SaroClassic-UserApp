export const productsReducer = (
  state = {
    featuredProducts: [],
    allProducts: [],
    menProducts: [],
  },
  { type, payload }
) => {
  switch (type) {
    case "SET_FEATURED_PRODUCTS":
      return { ...state, featuredProducts: payload };
    case "SET_ALL_PRODUCTS":
      return { ...state, allProducts: payload };
    case "SET_MEN_PRODUCTS":
      return { ...state, menProducts: payload };

    default:
      return state;
  }
};
