export const currentUserReducer = (
  state = { status: "loggedOut" },
  { type, payload }
) => {
  switch (type) {
    case "SET_CURRENT_USER":
      return { status: "loggedIn", user: payload };
    case "LOGOUT_USER":
      return { status: "loggedOut" };
    default:
      return state;
  }
};
