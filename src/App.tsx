import "./App.css";

import NewPlaylist from "./components/Playlists/CreateNewPlaylist/CreateNewPlaylist";
import Playlist from "./components/Playlists/ChoosePlaylist/SelectedPlaylist/SelectedPlaylist";
import { Switch } from "./components/Switch/Switch";
import Search from "./components/Tracks/TrackSearch/TrackSearch";
import SelectPlaylist from "./components/Playlists/ChoosePlaylist/ButtonSelectPlaylist/ButtonSelectPlaylist";

import useSpotify from "./store/hooks/useSpotify";
import { Item } from "./types/playlist";

import { authSelectors } from "./containers/auth/selectors";
import { trackSelectors } from "./containers/track/trackSelectors";
import { playlistSelectors } from "./containers/playlist/playlistSelectors";

import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// https://www.newline.co/@kchan/writing-a-custom-react-hook-for-spotifys-web-api-implicit-grant-flow--25967253
// https://developer.okta.com/blog/2022/08/29/react-typescript-redux


const App: FC = (): ReactElement => {
  let selectedPlaylist = {} as Item;
  const actions = useSpotify();
  const user = useSelector(authSelectors.getUser);
  const { getUserPlaylists } = useSelector(playlistSelectors.getUserPlaylists);
  const selectedPlaylistId = useSelector(trackSelectors.getSelectedPlaylistId);

  // Display the playlist's tracks when the user selects a playlist
  useEffect(() => {
    let displayedPlaylist: Item | undefined = findPlaylist();
    if (displayedPlaylist) {
      selectPlaylist(displayedPlaylist);
    }
  }, [selectedPlaylistId]);

  const findPlaylist = () => {
    return getUserPlaylists.items?.find((item) => item.id === selectedPlaylistId);
  };

  const selectPlaylist = (value: Item) => {
    selectedPlaylist = value;

    actions.getTracks(selectedPlaylist?.href);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      {user ? (
        <Container>
          <div className="app-switch">
            <Switch />
          </div>
          <div className="main-containers main">
            <div className="search">
              <Search />
            </div>
            <div className="addplaylist">
              <button onClick={handleShow} className="button-addnewplaylist">
                Add new playlist
              </button>
            </div>
          </div>
          <div className="main-containers">
            <div>
              <SelectPlaylist selectPlaylist={selectPlaylist} />
            </div>
          </div>
          <div className="main-containers">
            {selectedPlaylist ? <Playlist playlist={selectedPlaylist} /> : null}
          </div>
          <NewPlaylist show={show} handleClose={handleClose} />
        </Container>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default App;
