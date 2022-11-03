import { getTracks, addTrack, deleteTrack } from "../../containers/track/trackSlice";
import { createPlaylist, getPlaylists } from "../../containers/playlist/playlistSlice";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

//The hook enables all components to get the authorization status of the user and interact with Spotify's Web API.
// https://www.newline.co/@kchan/writing-a-custom-react-hook-for-spotifys-web-api-implicit-grant-flow--25967253
const useSpotify = () => {
  const dispatch = useDispatch();
  // Dispatch is a method that triggers an action, which in turn updates the Redux store.

  return bindActionCreators(
    { getTracks, addTrack, deleteTrack, createPlaylist, getPlaylists },
    dispatch
  );
};

export default useSpotify;
