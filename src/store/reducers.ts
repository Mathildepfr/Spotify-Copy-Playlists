import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;
