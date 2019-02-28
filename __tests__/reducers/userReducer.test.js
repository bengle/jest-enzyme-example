import UserReducer from "../../src/reducers/userReducer";

const initState = {
  user: {
    username: "",
    sex: "男",
    age: 20
  },
  list: []
};

describe("user reducer", () => {
  test("init is correct", () => {
    const action = { type: "default" };
    expect(UserReducer(undefined, action)).toEqual(initState);
    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });
  test("test username change reducer", () => {
    const action = {
      type: "CHANGE_USERNAME",
      payload: "abc"
    };
    expect(UserReducer(initState, action).user.username).toBe("abc");
    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });
  test("test sex change reducer", () => {
    const action = {
      type: "CHANGE_SEX",
      payload: true
    };
    expect(UserReducer(initState, action).user.sex).toBe("女");
    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });
  test("test get user list reducer", () => {
    const expectData = [
      {
        username: "tom",
        sex: "男",
        age: 18
      },
      {
        username: "jack",
        sex: "男",
        age: 30
      },
      {
        username: "lucy",
        sex: "女",
        age: 25
      }
    ];
    const action = {
      type: "GET_ALL_USERS",
      payload: expectData
    };
    expect(UserReducer(initState, action).list).toEqual(expectData);
    expect(UserReducer(undefined, action)).toMatchSnapshot();
  });
});
