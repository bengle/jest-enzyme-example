import configureStore from "redux-mock-store";
import * as UserActions from "../../src/actions/userAction";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import axios from "axios";

const mockStore = configureStore([thunk]);
const initState = {
  userReducer: {
    user: {
      username: "",
      sex: "男",
      age: 20
    },
    list: []
  },
  actions: {
    changeUsername: UserActions.changeUsername,
    changeUserSex: UserActions.changeUserSex
  }
};
const store = mockStore(initState);
const axiosMock = new MockAdapter(axios);

describe("user actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  test("dispatch correct actoin and payload", () => {
    const expectedActions = [
      {
        type: "CHANGE_USERNAME",
        payload: "abc"
      },
      {
        type: "CHANGE_SEX",
        payload: true
      }
    ];
    store.dispatch(UserActions.changeUsername("abc"));
    store.dispatch(UserActions.changeUserSex(true));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  test("test async action", async () => {
    const mockData = {
      status: 200,
      data: {
        code: 0,
        data: [
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
        ],
        msg: ""
      }
    };
    axiosMock
      .onGet("http://www.mocky.io/v2/5c7658db3200000b24f46080")
      .reply(200, mockData);
    const expectAction = {
      type: "GET_ALL_USERS",
      payload: mockData.data.data
    };
    store.dispatch(UserActions.getAllUsers()).then(() => {
      expect(store.getActions()).toContainEqual(expectAction);
    });
    await store.dispatch(UserActions.getAllUsers());
    expect(store.getActions()).toContainEqual(expectAction);
  });
});
