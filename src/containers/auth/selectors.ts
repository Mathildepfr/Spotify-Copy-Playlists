import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.authentication;

export const authSelectors = {
  getAccessToken: createSelector(selectSelf, (auth) => auth.accessToken),
  getUser: createSelector(selectSelf, (auth) => auth.user),
  getStatus: createSelector(selectSelf, (auth) => auth.status),
};
