import classes from "./SelectedPlaylist.module.css";

import Track from "../../../Tracks/TrackCards/TrackCards";
import { trackSelectors } from "../../../../containers/track/trackSelectors";

import { useSelector } from "react-redux";
import { TrackItem } from "../../../../types/track";
import { Spinner } from "react-bootstrap";
import { FaRegClock, FaTrash } from "react-icons/fa";

const Playlist: React.FC<any> = (props) => {
  const tracksList = useSelector(trackSelectors.getUserTracks);
  const tracksLoading = useSelector(trackSelectors.getTracksLoading);
  let trackItems: TrackItem[] = [];

  if (tracksList.getUserTracks) {
    trackItems = tracksList.getUserTracks;
  }

  return (
    <div>
      <div className={classes.heading}>
        <div className={classes.heading_names}>
          <div>Cover</div>
          <div>Title & Artist(s)</div>
          <div>Album</div>
          <div>Year</div>
          <div>
            <FaRegClock></FaRegClock>
          </div>
        </div>
        <div className={classes.delete_track}> </div>
      </div>
      <div>
        {tracksLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : tracksList?.getUserTracks.length > 0 ? (
          <div>
            {trackItems?.map((item, i) => (
              <Track key={i} trackItem={item.track} />
            ))}
          </div>
        ) : (
          <p>Your playlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
