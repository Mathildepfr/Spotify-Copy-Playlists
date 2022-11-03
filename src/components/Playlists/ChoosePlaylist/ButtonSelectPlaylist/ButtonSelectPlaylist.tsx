import classes from "./ButtonSelectPlaylist.module.css";

import { playlistSelectors } from "../../../../containers/playlist/playlistSelectors";

import useSpotify from "../../../../store/hooks/useSpotify";

import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectPlaylist: React.FC<any> = (props) => {
  const actions = useSpotify();
  const { getUserPlaylists } = useSelector(playlistSelectors.getUserPlaylists);

  useEffect(() => {
    actions.getPlaylists();
  }, []);

  const handlePlaylistChange = (e: any) => {
    let selectedPlaylist = getUserPlaylists.items.find(
      (playlist) => playlist.id === e.target.value
    );

    props.selectPlaylist(selectedPlaylist);
  };

  return (
    <div className={classes.selectedPlaylist_container}>
      <Form.Select
        className={classes.button_selectplaylist}
        aria-label="Select Playlist"
        onChange={(e) => handlePlaylistChange(e)}
      >
        {getUserPlaylists.items?.map((item, i) => (
          <option value={item.id} key={i}>
            {item.name} - {item.description}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default SelectPlaylist;
