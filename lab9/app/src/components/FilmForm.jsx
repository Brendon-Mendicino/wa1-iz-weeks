import { Button, Container, Form, Modal } from "react-bootstrap";
import "./FilmForm.css";
import { Film } from "../films";
import { useState } from "react";
import { FormGroup, Rating, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../API";

export function FilmForm(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const film = location.state?.film && Film.deserialize(location.state?.film);

  const [title, setTitle] = useState(film?.title || "");
  const [date, setDate] = useState(film?.watchDate?.format("YYYY-MM-DD") || "");
  const [isFavourite, setIsFavorite] = useState(film?.isFavourite || false);
  const [rating, setRating] = useState(film?.rating);

  const handleClose = () => {
    navigate("../..", { relative: "path" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFilm = new Film(
      film?.id || props.lastId,
      title,
      isFavourite,
      date === "" ? null : dayjs(date),
      rating
    );

    console.log(newFilm);
    if (film) {
    console.log(newFilm);
      API.updateFilm(newFilm);
    } else {
      API.addFilm(newFilm);
    }

    handleClose();
  };

  return (
    <>
      <Form className="film-form" onSubmit={handleSubmit}>
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
        <FormGroup>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </FormGroup>
        <Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {film == null ? "Add new film" : "Update film"}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
