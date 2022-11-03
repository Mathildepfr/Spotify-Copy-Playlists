import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import playlist from "../containers/playlist/playlistSlice";
import track from "../containers/track/trackSlice";

const rootReducer = combineReducers({
  authentication,
  playlist,
  track,
});

export default rootReducer;
