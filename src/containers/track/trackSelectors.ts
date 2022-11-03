import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.track;

// https://redux-toolkit.js.org/api/createSelector
// A selector returns a piece of the live Redux state as stored in the live Redux store.
// https://github.com/reduxjs/reselect


export const trackSelectors = {
  getUserTracks: createSelector(selectSelf, (track) => track),
  getSelectedPlaylistId: createSelector(
    selectSelf,
    (track) => track.selectedId
  ),
  getTracksLoading: createSelector(selectSelf, (track) => track.isLoading),
};
