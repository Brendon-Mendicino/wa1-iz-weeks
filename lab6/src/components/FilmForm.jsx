import { Button, Container, Form, Modal } from "react-bootstrap";
import "./FilmForm.css";
import { Film } from "../films";
import { useState } from "react";
import { Rating, Typography } from "@mui/material";
import dayjs from "dayjs";

const addIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-plus-lg"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
    />
  </svg>
);

export function FilmForm(props) {
  const [show, setShow] = useState(props.show || false);
  const handleClose = () => {
    setShow(false);
    props.cancel();
  };
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState(props.film?.title || "");
  const [date, setDate] = useState(
    props.film?.watchDate?.format("YYYY-MM-DD") || ""
  );
  const [isFavourite, setIsFavorite] = useState(
    props.film?.isFavourite || false
  );
  const [rating, setRating] = useState(props.film?.rating);

  const handleSubmit = (event) => {
    event.preventDefault();

    const film = new Film(
      props.film?.id || props.lastId,
      title,
      isFavourite,
      date === "" ? null : dayjs(date),
      rating
    );

    if (props.film) {
      props.updateFilm(film);
    } else {
      props.addNewFilm(film);
    }

    handleClose();
  };

  return (
    <>
      <Button
        variant="primary"
        className="film-form-button"
        onClick={handleShow}
      >
        {addIcon}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new film</Modal.Title>
        </Modal.Header>
        <Form className="film-form" onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Watch date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Favorite"
                checked={isFavourite}
                onChange={(event) => {
                  setIsFavorite((val) => !val);
                }}
              />
            </Form.Group>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {props.film == null ? "Add new film" : "Update film"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
