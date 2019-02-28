const initState = {
  user: {
    username: "",
    sex: "男",
    age: 20
  },
  list: []
};

export default (state = initState, action) => {
  let { type, payload } = action;
  switch (type) {
    case "CHANGE_USERNAME":
      let user1 = { ...state.user, username: payload };
      return { ...state, user: user1 };
    case "CHANGE_SEX":
      let user2 = null;
      switch (payload) {
        case true:
          user2 = { ...state.user, sex: "女" };
          break;
        case false:
          user2 = { ...state.user, sex: "男" };
          break;
      }
      return { ...state, user: user2 };
    case "GET_ALL_USERS":
      return { ...state, list: payload };
    default:
      return state;
  }
};
