import {
  Button,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Film } from "../films";
import "./FilmList.css";
import { Checkbox, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { removeIcon } from "../assets/Icons";

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

export function FilmList(props) {
  return (
    <div className="list-containter">
      <p>{props.filter}</p>
      <ListGroup className="film-list" variant="flush">
        {props.films.map((f) => (
          <FilmItem
            film={f}
            key={f.id}
            updateFilm={props.updateFilm}
            removeFilm={props.removeFilm}
          />
        ))}
      </ListGroup>
    </div>
  );
}

function FilmItem(props) {
  const updateIsFavorite = (event) => {
    const newFilm = new Film(
      props.film.id,
      props.film.title,
      !props.film.isFavourite,
      props.film.watchDate,
      props.film.rating
    );
    props.updateFilm(newFilm);
  };

  const updateRating = (newRating) => {
    const newFilm = new Film(
      props.film.id,
      props.film.title,
      props.film.isFavourite,
      props.film.watchDate,
      newRating
    );
    props.updateFilm(newFilm);
  };

  return (
    <ListGroupItem>
      <Row>
        <Col className={`col-3 ${props.film.isFavourite ? "text-danger" : ""}`}>
          <Button
            className="me-2"
            variant="danger"
            onClick={() => props.removeFilm(props.film)}
          >
            {removeIcon}
          </Button>
          <Link
            className="me-2 btn btn-outline-secondary"
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
            readOnly
            checked={props.film.isFavourite}
            onChange={updateIsFavorite}
          />
          Favoutite
        </Col>
        <Col className="col-3 text-end">
          {props.film.watchDate?.format("DD MMM YYYY")}
        </Col>
        <Col className="col-3 text-end">
          <Rating
            name="read-only"
            value={props.film.rating}
            onChange={(event, newValue) => updateRating(newValue)}
          />
        </Col>
      </Row>
    </ListGroupItem>
  );
}
