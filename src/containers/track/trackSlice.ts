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

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
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
