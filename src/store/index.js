import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import { Service } from "./services";

import rootStore from "./rootReducer";
function configureStore(initialState = {}) {
  // thunkMiddleware.withExtraArgument(Service);
  return createStore(rootStore, initialState, applyMiddleware(thunkMiddleware));
}

export default configureStore({});
