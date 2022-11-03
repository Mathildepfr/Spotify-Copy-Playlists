import { createSlice, createAction } from "@reduxjs/toolkit";
import { Playlist, PlaylistRequest } from "../../types/playlist";
import { ErrorPayload } from "../../types/requests";

export interface PlaylistState {
  getUserPlaylists: Playlist;
  isLoading: boolean;
  error?: string;
}

const initialState: PlaylistState = {
  getUserPlaylists: {} as Playlist,
  isLoading: false,
};

// Create actions
export const getPlaylists = createAction("playlists/getPlaylistsApi");
export const createPlaylist = createAction<PlaylistRequest>(
  "playlists/addPlaylistsApi"
);
export const getPlaylistFailed = createAction<ErrorPayload>(
  "playlists/getPlaylistFailed"
);

const playlistsSlice = createSlice({
  // A name, used in action types
  name: "playlists",
  // The initial state for the reducer
  initialState,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    getPlaylistsFetch: (state) => {
      state.isLoading = true;
    },
    getPlaylistsSuccess: (state, action) => {
      state.getUserPlaylists = action.payload;
      state.isLoading = false;
    },
    addPlaylistsSuccess: (state, action) => {
      state.isLoading = false;
      state.getUserPlaylists.items.unshift(action.payload);
    },
    getPlaylistsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  getPlaylistsFetch,
  getPlaylistsSuccess,
  getPlaylistsFailure,
  addPlaylistsSuccess,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
