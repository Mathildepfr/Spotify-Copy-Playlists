import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.playlist;

// https://redux-toolkit.js.org/api/createSelector
// https://github.com/reduxjs/reselect
// Reselect exports a createSelector API, which generates memoized selector functions.
// createSelector accepts one or more "input" selectors, which extract values from arguments,
// and an "output" selector that receives the extracted values and should return a derived value.
// If the generated selector is called multiple times, the output will only be recalculated when the extracted values have changed.
export const playlistSelectors = {
  getUserPlaylists: createSelector(selectSelf, (playlist) => playlist),
};
