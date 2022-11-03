import { getTracks, addTrack, deleteTrack } from "../../containers/track/trackSlice";
import { createPlaylist, getPlaylists } from "../../containers/playlist/playlistSlice";

import { useDispatch } from "react-redux";
// Dispatch is a method that triggers an action, which in turn updates the Redux store.
import { bindActionCreators } from "redux";
// Turns an object whose values are action creators, into an object with the same keys,
// but with every action creator wrapped into a dispatch call so they may be invoked directly.
// https://redux.js.org/api/bindactioncreators

//The hook enables all components to get the authorization status of the user and interact with Spotify's Web API.
// https://www.newline.co/@kchan/writing-a-custom-react-hook-for-spotifys-web-api-implicit-grant-flow--25967253
const useSpotify = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    { getTracks, addTrack, deleteTrack, createPlaylist, getPlaylists },
    dispatch
  );
};

export default useSpotify;
