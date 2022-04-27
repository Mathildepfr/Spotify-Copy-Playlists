import { RootState } from "../../store/store";

export const getAccessToken = () => (state: RootState) =>
  state.authentication.accessToken;
