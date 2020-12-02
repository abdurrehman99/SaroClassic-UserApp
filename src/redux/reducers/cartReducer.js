import { jwtSign, jwtVerify } from "../../utils/jwt";

export const cartReducer = (
  state = { items: [], total: 0 },
  { type, payload }
) => {
  let newCart = {};
  switch (type) {
    case "CART_LOAD":
      newCart = jwtVerify(localStorage.getItem("_tcar")) || {
        items: [],
        total: 0,
      };
      const { items, total } = newCart;
      return { items, total };
    case "CART_ADD_PRODUCT":
      // newCart = state.items.filter((e) => e._id === payload._id).length
      //   ? state
      //   : {
      //       items: [...state.items, payload],
      //       total: state.total + payload.price,
      //     };
      newCart = {
        items: [...state.items, payload],
        total: state.total + payload.price,
      };
      localStorage.setItem("_tcar", jwtSign(newCart));
      return newCart;
    case "CART_REMOVE_PRODUCT":
      newCart = {
        items: state.items.filter((ele) => ele._id !== payload._id),
        total: state.total - payload.price,
      };
      localStorage.setItem("_tcar", jwtSign(newCart));
      return newCart;
    case "CART_CLEAR":
      newCart = {
        items: [],
        total: 0,
      };
      localStorage.setItem("_tcar", jwtSign(newCart));
      return newCart;
    default:
      return state;
  }
};
