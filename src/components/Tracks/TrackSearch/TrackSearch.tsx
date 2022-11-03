import classes from "./TrackSearch.module.css";

import { authSelectors } from "../../../containers/auth/selectors";
import { Track as TrackType } from "../../../types/track";
import Track from "../TrackCards/TrackCards";

import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

// Get search results
const Search: React.FC<any> = (props) => {
  const [searchText, setSearchText] = useState("");
  const accessToken = useSelector(authSelectors.getAccessToken);
  const initialState: TrackType[] = [];
  const [openResults, setOpenResults] = useState(initialState);

  useEffect(() => {
    if (searchText) {
      axios
        .get(`https://api.spotify.com/v1/search?q=${searchText}&type=track`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setOpenResults(response.data.tracks.items);
        });
    }
  }, [accessToken, searchText]);

  const handleChange = (e: any) => {
    if (e.target.value) {
      setSearchText(e.target.value);
    } else {
      setOpenResults([]);
    }
  };

  return (
    <Row>
      <Col>
        <Row className={classes.search_container}>
          <Col className = {classes.search_box}>
            <FaSearch></FaSearch>
            <Form>
              <Form.Control
                className={classes.search_input}
                aria-label="search"
                type="text"
                onChange={(e) => handleChange(e)}
                name="search"
                placeholder="Search for a track"
              />
            </Form>
          </Col>
        </Row>
        {searchText && (
          <div className={classes.search}>
            {openResults &&
              openResults?.map((item, i) => (
                <Track key={i} trackItem={item} isSearch={true} />
              ))}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Search;
