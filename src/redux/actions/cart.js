export const addToCart = (payload) => {
  return {
    type: "CART_ADD_PRODUCT",
    payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: "CART_REMOVE_PRODUCT",
    payload,
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
