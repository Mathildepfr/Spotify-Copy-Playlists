import classes from "./CreateNewPlaylist.module.css";

import { PlaylistRequest } from "../../../types/playlist";
import useSpotify from "../../../store/hooks/useSpotify";

import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

const NewPlaylist: React.FC<any> = (props) => {
  const actions = useSpotify();

  const initialFormData: PlaylistRequest = {
    name: "",
    description: "",
    public: false,
  };
  const [playlistInfo, setPlaylistInfo] = useState(initialFormData);

  const handleChange = (e: any) => {
    setPlaylistInfo({
      ...playlistInfo,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    actions.createPlaylist(playlistInfo);

    props.handleClose();
  };

  return (
    <Modal
      className={classes.modalcontainer}
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton className={classes.modalcontent}>
        <Modal.Title className={classes.modalcontent_title}>NEW PLAYLIST</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.modalcontent}>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              aria-label="name"
              type="text"
              onChange={(e) => handleChange(e)}
              name="name"
              placeholder="Summer Vibes, Dancing Tonight, etc."
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              aria-label="description"
              as="textarea"
              onChange={(e) => handleChange(e)}
              name="description"
              rows={4}
              placeholder="Lofi music for people who hate lofi music, Songs to listen to once and never get out of your head, For those trying to forget about the neighbor’s loud dog, etc."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" size="lg" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="success" size="lg" type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPlaylist;
