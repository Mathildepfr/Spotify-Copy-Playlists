import { all } from "@redux-saga/core/effects";

import authSaga from "../containers/auth/authSagas";

export default function* rootSaga() {
  yield all([authSaga()]);
}
