import {
  Button,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import { Film } from "../films";
import "./FilmList.css";
import { Checkbox, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { removeIcon } from "../assets/Icons";
import API from "../API";

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-pencil"
    viewBox="0 0 16 16"
  >
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
  </svg>
);

/**
 *
 * @param {{ films: Film[],
 * filter: *, updateRating: *, updateFavorite: *, deleteFilm: *}} props
 * @returns
 */
export function FilmList(props) {
  return (
    <div className="list-containter">
      <p>{props.filter}</p>
      <ListGroup className="film-list" variant="flush">
        {props.films.map((f) => (
          <FilmItem
            film={f}
            key={f.id}
            updateRating={props.updateRating}
            updateFavorite={props.updateFavorite}
            deleteFilm={props.deleteFilm}
          />
        ))}
      </ListGroup>
    </div>
  );
}

/**
 *
 * @param {{ film: Film, updateRating: *, updateFavorite: *, deleteFilm: *}} props
 * @returns
 */
function FilmItem(props) {
  const [waiting, setWaiting] = useState(false);
  const [isFavourite, setIsFavorite] = useState(props.film.isFavourite);
  const [rating, setRating] = useState(props.film.rating || 0);

  /**
   *
   * @param {React.ChangeEvent.<HTMLInputElement>} event
   */
  const updateFavorite = async (favorite) => {
    try {
      setIsFavorite(favorite);
      setWaiting(true);
      await API.updateFavorite(props.film.id, favorite);
      props.updateFavorite(props.film.id, favorite);
    } finally {
      setWaiting(false);
    }
  };

  const updateRating = async (newRating) => {
    try {
      setRating(newRating);
      setWaiting(true);
      await API.updateRating(props.film.id, newRating);
      props.updateRating(props.film.id, newRating);
    } finally {
      setWaiting(false);
    }
  };

  const deleteFilm = async () => {
    try {
      setWaiting(true);
      await API.deleteFilmById(props.film.id);
      props.deleteFilm(props.film.id);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <ListGroupItem>
      <Row>
        <Col className={`col-3 ${isFavourite ? "text-danger" : ""}`}>
          <Button
            className="me-2"
            disabled={waiting}
            variant="danger"
            onClick={deleteFilm}
          >
            {waiting ? <Spinner size="sm" /> : removeIcon}
          </Button>
          <Link
            className="me-2 btn btn-outline-secondary"
            style={waiting ? { pointerEvents: "none" } : {}}
            to="film/edit"
            relative="path"
            state={{ film: props.film.serialize() }}
          >
            {editIcon}
          </Link>
          {props.film.title}
        </Col>
        <Col className="col-3 text-end">
          <Checkbox
            type="checkbox"
            disabled={waiting}
            checked={isFavourite}
            onChange={(event, newValue) => updateFavorite(newValue)}
          />
          Favoutite
        </Col>
        <Col className="col-3 text-end">
          {props.film.watchDate?.format("DD MMM YYYY")}
        </Col>
        <Col className="col-3 text-end">
          <Rating
            name="read-only"
            disabled={waiting}
            value={rating}
            onChange={(event, newValue) => updateRating(newValue)}
          />
        </Col>
      </Row>
    </ListGroupItem>
  );
}
