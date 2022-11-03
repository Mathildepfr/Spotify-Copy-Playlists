import classes from "./TrackCards.module.css";

import { Track as TrackType } from "../../../types/track";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import useSpotify from "../../../store/hooks/useSpotify";
import millisToMinutesAndSeconds from '../../../utils/msToMinutes';


const Track: React.FC<any> = (props) => {
  let trackElement: TrackType = props.trackItem;
  let isSearch: boolean = props.isSearch;

  const actions = useSpotify();

  const handleAddTrack = (track: TrackType) => {
    actions.addTrack(track);
  };

  const handleDeleteTrack = (track: TrackType) => {
    actions.deleteTrack(track);
  };

  return (
    <div className={classes.trackCard_container}>
      <div className={classes.trackCard_layout}>
        <div>
          <img
            className={classes.cover}
            src={trackElement.album.images[0].url}
            alt="Cover"
          />
        </div>
        <div className={classes.titleAndArtist}>
          <div>
            <span className={classes.track_title}>{trackElement.name}</span>
          </div>
          <div>
            {trackElement.artists.map((artist, i) => (
              <span key={i} className={classes.track_artist}>{artist.name}</span>
            ))}
          </div>
        </div>
        <div>
          <span className={classes.track_album}>{trackElement.album.name}</span>
        </div>
        <div>
          <span className={classes.track_releasedate}>{trackElement.album.release_date.substring(0, 4)}</span>
        </div>
        <div>
          <span className={classes.track_releasedate}>{millisToMinutesAndSeconds(trackElement.duration_ms)}</span>
        </div>
      </div>
      {isSearch && (
        <div className={classes.edit_track}>
          <FaPlusCircle onClick={() => handleAddTrack(trackElement)} />
        </div>
      )}
      {!isSearch && (
        <div className={classes.edit_track}>
          <FaMinusCircle onClick={() => handleDeleteTrack(trackElement)} />
        </div>
      )}
    </div>
  );
};

export default Track;
