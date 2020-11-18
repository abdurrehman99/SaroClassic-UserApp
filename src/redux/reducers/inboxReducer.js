export const inboxReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "INBOX":
      return payload;
    default:
      return state;
  }
};
