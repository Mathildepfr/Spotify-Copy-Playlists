import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  userId?: string;
  status: RequestStatus;
  error?: string;
}

export interface AccessTokenPayload {
  accessToken: string;
}

export interface FetchUserIDSuccessPayload {
  userID: string;
}

const initialState: AuthState = {
  status: RequestStatus.IDLE,
};

// Create actions
export const getUserId = createAction("auth/getUserId");
export const getUserIdSuccess = createAction<string>("auth/getUserIdSuccess");
export const getUserIdFailed = createAction<ErrorPayload>(
  "auth/getUserIdFailed"
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login() {
      const { REACT_APP_SPOTIFY_CLIENT_ID } = process.env;
      const scopes: string = SPOTIFY_SCOPE.join(",");

      window.location.href = `https://accounts.spotify.com/me/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;
    },
    setAccessToken(state, action: PayloadAction<AccessTokenPayload>) {
      state.accessToken = action.payload.accessToken;
      window.history.pushState({ REDIRECT_URI }, "", REDIRECT_URI);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserId, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(getUserIdSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.userId = action.payload;
      })
      .addCase(getUserIdFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      });
  },
});

export const { login, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
