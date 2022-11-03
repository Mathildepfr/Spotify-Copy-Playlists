import { all } from "@redux-saga/core/effects";

import authSaga from "../containers/auth/authSagas";
import playlistSaga from "../containers/playlist/playlistSagas";
import trackSaga from "../containers/track/trackSaga";

// A root Saga aggregates multiple Sagas to a single entry point for the sagaMiddleware to run
export default function* rootSaga() {
  yield all([authSaga(), playlistSaga(), trackSaga()]);
}
