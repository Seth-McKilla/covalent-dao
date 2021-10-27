export function dao(state, action) {
  switch (action.type) {
    case "SET_DAO":
      return { ...state, info: action.payload };
    default:
      return state;
  }
}
