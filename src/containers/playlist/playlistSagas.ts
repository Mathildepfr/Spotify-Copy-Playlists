import { playlistSelectors } from "./playlistSelectors";
import { authSelectors } from "../auth/selectors";
import { User } from "../auth/slice";
import { Playlist } from "../../types/playlist";

import * as tracksSlicesActions from "../track/trackSlice";
import {
  getPlaylists,
  createPlaylist,
  getPlaylistsSuccess,
  getPlaylistsFailure,
  addPlaylistsSuccess,
} from "./playlistSlice";

import axios, { AxiosResponse } from "axios";
import { put, select, takeLatest } from "redux-saga/effects";

// GET PLAYLISTS
function* getPlaylistsApiSaga() {
  try {
    const accessToken: string = yield select(authSelectors.getAccessToken);
    // Get MY playlists with v1/me
    const { data }: AxiosResponse<Playlist> = yield axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    yield put(getPlaylistsSuccess(data));

    // Get tracks of the first playlist
    const { getUserPlaylists } = yield select(playlistSelectors.getUserPlaylists);
    yield put(tracksSlicesActions.getTracks(getUserPlaylists.items[0]?.href));
  } catch (error: any) {  // Using catch in case the API doesn't work
    yield put(getPlaylistsFailure({ message: error.message }));
  }
}

// ADD PLAYLISTS
function* addPlaylistApiSaga(action: ReturnType<typeof createPlaylist>) {
  try {
    const accessToken: string = yield select(authSelectors.getAccessToken);
    const user: User = yield select(authSelectors.getUser);
    // Get a list of user's playlist
    const { data }: AxiosResponse<Playlist> = yield axios.post(
      `https://api.spotify.com/v1/users/${user.userId}/playlists`,
      action.payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    yield put(addPlaylistsSuccess(data));

    // Display the newly created playlist to the user
    const { playlists } = yield select(playlistSelectors.getUserPlaylists);
    yield put(tracksSlicesActions.getTracks(playlists.items[0]?.href));
  } catch (error: any) {
    yield put(getPlaylistsFailure({ message: error.message }));
  }
}

export default function* playlistSaga() {
  yield takeLatest(getPlaylists.type, getPlaylistsApiSaga);
  yield takeLatest(createPlaylist.type, addPlaylistApiSaga);
}
