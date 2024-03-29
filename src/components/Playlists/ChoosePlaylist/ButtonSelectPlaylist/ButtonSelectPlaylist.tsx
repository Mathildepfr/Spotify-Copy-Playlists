import classes from "./ButtonSelectPlaylist.module.css";

import { playlistSelectors } from "../../../../containers/playlist/playlistSelectors";

import useSpotify from "../../../../store/hooks/useSpotify";

import { useEffect } from "react";
// The useEffect Hook allows you to perform side effects in your components.
// Some examples of side effects are: fetching data, directly updating the DOM, and timers.
// useEffect accepts two arguments.The second argument is optional.
// useEffect(<function>, <dependency>)
// https://www.w3schools.com/react/react_useeffect.asp
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
// useSelector: Allows you to extract data from the Redux store state, using a selector function.
// https://react-redux.js.org/api/hooks#using-memoizing-selectors

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
