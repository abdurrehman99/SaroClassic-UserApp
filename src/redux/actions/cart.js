export const addToCart = (product) => {
  return {
    type: "CART_ADD_PRODUCT",
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: "CART_REMOVE_PRODUCT",
    payload: product,
  };
};

export const loadCart = () => {
  return {
    type: "CART_LOAD",
  };
};

export const clearCart = () => {
  return {
    type: "CART_CLEAR",
  };
};
