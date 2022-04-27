import axios from "axios";

import { call, put, select, takeEvery } from "@redux-saga/core/effects";

import { authSelectors } from "./selectors";
import { getUser, getUserFailed, getUserSuccess } from "./slice";

function* getUserIdSaga() {
  try {
    const accessToken: string = yield select(authSelectors.getAccessToken);

    const request = () =>
      axios.get<any>("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    const { data } = yield call(request);

    yield put(getUserSuccess({ userId: data.id, userName: data.display_name }));
  } catch (error: any) {
    yield put(getUserFailed({ message: error.message }));
  }
}

export default function* authSaga() {
  yield takeEvery(getUser.type, getUserIdSaga);
}
