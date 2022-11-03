import axios, { AxiosResponse } from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import {
  getTracksFetch,
  getTracks,
  setSelectedPlaylistId,
  setTracksSuccess,
  setTracksFailure,
  addTrack,
  deleteTrack,
  setAddTrackSuccess,
  setDeleteTrackSuccess,
} from "./trackSlice";
import { authSelectors } from "../auth/selectors";
import { trackSelectors } from "./trackSelectors";

// https://developer.spotify.com/documentation/web-api/

// GET TRACKS
function* getTracksApiSaga(action: ReturnType<typeof getTracks>) {
  try {
    yield put(getTracksFetch());

    const accessToken: string = yield select(authSelectors.getAccessToken);

    const { data }: AxiosResponse<any> = yield axios.get(`${action.payload}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    yield put(setSelectedPlaylistId(data.id));
    yield put(setTracksSuccess(data));
  } catch (error: any) {  // Using catch in case the API doesn't work
    yield put(setTracksFailure({ message: error.message }));
  }
}

// ADD TRACKS
function* addTrackApiSaga(action: ReturnType<typeof addTrack>) {
  try {
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const selectedPlaylistId: string = yield select(
      trackSelectors.getSelectedPlaylistId
    );

    let payload = {
      uris: [action.payload.uri],
    };

    yield axios.post(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks?uris=${action.payload.uri}`,
      payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    yield put(setAddTrackSuccess(action));
  } catch (error: any) {
    yield put(setTracksFailure({ message: error.message }));
  }
}

// DELETE TRACKS
function* deleteTrackApiSaga(action: ReturnType<typeof deleteTrack>) {
  try {
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const selectedPlaylistId: string = yield select(
      trackSelectors.getSelectedPlaylistId
    );

    const { data }: AxiosResponse<any> = yield fetch(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`,
      {
        body: '{"tracks":[{"uri":"' + action.payload.uri + '"}]}',
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );

    yield put(setDeleteTrackSuccess(action));
  } catch (error: any) {
    yield put(setTracksFailure({ message: error.message }));
  }
}

export default function* trackSaga() {
  yield takeLatest(getTracks.type, getTracksApiSaga);
  yield takeLatest(addTrack.type, addTrackApiSaga);
  yield takeLatest(deleteTrack.type, deleteTrackApiSaga);
}
