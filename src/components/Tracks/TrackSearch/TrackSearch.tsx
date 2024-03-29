import classes from "./TrackSearch.module.css";

import { authSelectors } from "../../../containers/auth/selectors";
import { Track as TrackType } from "../../../types/track";
import Track from "../TrackCards/TrackCards";

import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
// The useEffect Hook allows you to perform side effects in your components.
// Some examples of side effects are: fetching data, directly updating the DOM, and timers.
// useEffect accepts two arguments.The second argument is optional.
// useEffect(<function>, <dependency>)
// https://www.w3schools.com/react/react_useeffect.asp

// The React useState Hook allows us to track state in a function component.
// State generally refers to data or properties that need to be tracking in an application.
// https://www.w3schools.com/react/react_usestate.asp

import axios from "axios";
import { useSelector } from "react-redux";
// useSelector: Allows you to extract data from the Redux store state, using a selector function.
// https://react-redux.js.org/api/hooks#using-memoizing-selectors
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
