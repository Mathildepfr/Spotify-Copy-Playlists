import axios from "axios";

import { call, put, select, takeEvery } from "@redux-saga/core/effects";

import { authSelectors } from "./selectors";
import { getUserId, getUserIdFailed, getUserIdSuccess } from "./slice";

function* getUserIdSaga() {
  try {
    const accessToken: string = yield select(authSelectors.getAccessToken);

    const request = () =>
      axios.get<any>("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    const { data } = yield call(request);
		console.log(data);

    yield put(getUserIdSuccess(data.id));
  } catch (error: any) {
    yield put(getUserIdFailed({ message: error.message }));
  }
}

export default function* authSaga() {
  yield takeEvery(getUserId.type, getUserIdSaga);
}
