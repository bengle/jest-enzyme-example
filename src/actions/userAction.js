import { get } from "../utils/http";
export const changeUsername = name => {
  return {
    type: "CHANGE_USERNAME",
    payload: name
  };
};
export const changeUserSex = isChecked => {
  return {
    type: "CHANGE_SEX",
    payload: isChecked
  };
};

export const getAllUsers = () => dispatch => {
  return get("http://www.mocky.io/v2/5c7658db3200000b24f46080").then(res => {
    if (res.data.code === 0) {
      dispatch({
        type: "GET_ALL_USERS",
        payload: res.data.data
      });
    }
  });
};
