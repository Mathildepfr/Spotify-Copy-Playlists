import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ErrorPayload, RequestStatus } from "../../types/requests";

const SPOTIFY_SCOPE = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];

const REDIRECT_URI = window.location.origin;

export interface AuthState {
  accessToken?: string;
  userID?: string;
  status: RequestStatus;
  error?: string;
}

export interface SetAccessTokenPayload {
  accessToken: string;
}

export interface FetchUserIDSuccessPayload {
  userID: string;
}

const initialState: AuthState = {
  status: RequestStatus.IDLE,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login() {
      console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
      const { REACT_APP_SPOTIFY_CLIENT_ID } = process.env;

      window.location.href = `https://accounts.spotify.com/me/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SPOTIFY_SCOPE.join(",")}`;
    },
    setAccessToken(state, action: PayloadAction<SetAccessTokenPayload>) {
      state.accessToken = action.payload.accessToken;
      window.history.pushState({ REDIRECT_URI }, "", REDIRECT_URI);
    },
    fetchUserID(state) {
      state.status = RequestStatus.PENDING;
    },
    fetchUserIDSuccess(
      state,
      action: PayloadAction<FetchUserIDSuccessPayload>
    ) {
      state.status = RequestStatus.SUCCESS;
      state.userID = action.payload.userID;
    },
    fetchUserIDError(state, action: PayloadAction<ErrorPayload>) {
      state.status = RequestStatus.ERROR;
      state.error = action.payload.message;
    },
  },
});

export const {
  login,
  setAccessToken,
  fetchUserID,
  fetchUserIDSuccess,
  fetchUserIDError,
} = authSlice.actions;

export default authSlice.reducer;
