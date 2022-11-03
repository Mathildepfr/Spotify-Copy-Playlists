import { createSlice, createAction } from "@reduxjs/toolkit";
import { ErrorPayload } from "../../types/requests";
import { Track as TrackType, TrackItem } from "../../types/track";

export interface TrackstState {
  selectedId: string;
  getUserTracks: TrackItem[];
  isLoading: boolean;
  error?: string;
}

// Create actions
export const getTracks = createAction<string>("tracks/getTracksApi");
export const addTrack = createAction<TrackType>("tracks/addTrackApi");
export const deleteTrack = createAction<TrackType>("tracks/deleteTrackApi");
export const setSelectedPlaylist = createAction<string>(
  "tracks/setSelectedPlaylist"
);
export const getTracksFailed = createAction<ErrorPayload>(
  "tracks/getTracksFailed"
);

const initialState: TrackstState = {
  selectedId: "",
  getUserTracks: [] as TrackItem[],
  isLoading: false,
};

// createSlice : A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
// This API is the standard approach for writing Redux logic.
// https://redux-toolkit.js.org/api/createslice

const tracksSlice = createSlice({
  // A name, used in action types
  name: "tracks",
  // The initial state for the reducer
  initialState,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    getTracksFetch: (state) => {
      state.isLoading = true;
    },
    setTracksSuccess: (state, action) => {
      state.getUserTracks = action.payload.tracks.items;
      state.isLoading = false;
    },
    setAddTrackSuccess: (state, action) => {
      let newTrack: TrackItem = {
        track: action.payload.payload,
      };
      // Do not add track if it is already in the playlist
      if (state.getUserTracks.find((track) => track.track.id === newTrack.track.id)) {
        return;
      }

      state.getUserTracks.unshift(newTrack);

      state.isLoading = false;
    },
    setDeleteTrackSuccess: (state, action) => {
      let deletedTrack: TrackItem = {
        track: action.payload.payload,
      };
      let trackFromList: TrackItem | undefined = state.getUserTracks.find(
        (track) => track.track.id === deletedTrack.track.id
      );
      let trackId: number;
      if (trackFromList) {
        trackId = state.getUserTracks.indexOf(trackFromList);

        state.getUserTracks.splice(trackId, 1);
      }
      state.isLoading = false;
    },
    setTracksFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    setSelectedPlaylistId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  getTracksFetch,
  setTracksSuccess,
  setAddTrackSuccess,
  setDeleteTrackSuccess,
  setTracksFailure,
  setSelectedPlaylistId,
} = tracksSlice.actions;

export default tracksSlice.reducer;
