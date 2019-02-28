import React from "react";
import { Provider } from "react-redux";
import { shallow, mount, render } from "enzyme";
import configureStore from "redux-mock-store";
import ConnectUserPage, { UserPage } from "../../../src/pages/user";
import * as UserActions from "../../../src/actions/userAction";
import thunk from "redux-thunk";

function setup() {
  const onChangeName = jest.spyOn(UserPage.prototype, "onChangeName");
  const onChangeSex = jest.spyOn(UserPage.prototype, "onChangeSex");
  const dispatch = jest.fn();

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

  const sWrapper = shallow(<UserPage {...initState} />);
  const mWrapper = mount(<UserPage {...initState} />);
  const sConnectWrapper = shallow(<ConnectUserPage />, {
    context: {
      dispatch: dispatch,
      store: store
    }
  });
  // const sConnectWrapper = shallow(
  //   <Provider store={store}>
  //     <ConnectUserPage />
  //   </Provider>
  // );
  const mConnectWrapper = mount(
    <Provider store={store}>
      <ConnectUserPage />
    </Provider>
  );
  return {
    sConnectWrapper,
    mConnectWrapper,
    sWrapper,
    mWrapper,
    onChangeName,
    onChangeSex
  };
}

describe("test page render", () => {
  const {
    sWrapper,
    mWrapper,
    sConnectWrapper,
    mConnectWrapper,
    onChangeSex,
    onChangeName
  } = setup();

  it("test snapshot", () => {
    expect(sWrapper).toMatchSnapshot();
  });
  it("test username input render", () => {
    const SexInput = sWrapper.find("#T_Sex");
    const props = sWrapper.instance().props;
    expect(SexInput.length).toBe(1);
    expect(SexInput.props().checked).toBeFalsy();
    expect(SexInput.props().checked).toBe(false);
    // console.log(wrapper.props().userReducer);
    // expect(props).toEqual({
    //   userReducer: {
    //     user: {
    //       username: "",
    //       sex: "男",
    //       age: 20
    //     }
    //   },
    //   actions: {
    //     changeUsername: UserActions.changeUsername,
    //     changeUserSex: UserActions.changeUserSex
    //   }
    // });
    expect(props.userReducer).toEqual({
      user: {
        username: "",
        sex: "男",
        age: 20
      },
      list: []
    });
  });
  it("test username change", () => {
    const UsernameInput = sWrapper.find("#T_Username");
    const reducer = sWrapper.instance().props;
    UsernameInput.simulate("change", { target: { value: "abc" } });
    expect(onChangeName).toHaveBeenCalled();
  });
  it("test function by instance", () => {
    const usernameChange = jest.spyOn(mWrapper.instance(), "onChangeName");
    mWrapper.instance().forceUpdate();
    mWrapper
      .find("#T_Username")
      .simulate("change", { target: { value: "abc" } });
    expect(usernameChange).toHaveBeenCalled();
  });
  it("test sex change", () => {
    const SexInput = sWrapper.find("#T_Sex");
    const reducer = mWrapper.props("userReducer");
    SexInput.simulate("change", { target: { checked: true } });
    expect(onChangeSex).toHaveBeenCalled();
    expect(sWrapper.state().isChecked).toBe(true);
  });
  it("test connect component", () => {
    // const props = sConnectWrapper.instance().props;
    // const props = sConnectWrapper.props().value.storeState.userReducer;
    const usernameInput = sConnectWrapper.find("#T_Username");
    console.log(sConnectWrapper.instance());
    // usernameInput.simulate("change", { target: { value: "abc" } });

    // expect(props.store.getState().userReducer.user.username).toBe("abc");
  });
});
