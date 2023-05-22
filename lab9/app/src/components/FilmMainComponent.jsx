import { Col, Row } from "react-bootstrap";
import { Sidebar } from "./Sidebar";
import { FilmList } from "./FilmList";
import { Link, useParams } from "react-router-dom";
import { FilmFilter, filterFilmBy, filterType } from "../App";
import Page404Component from "./Page404Component";
import { addIcon } from "../assets/Icons";
import { useEffect, useState } from "react";
import API from "../API";
import { Film } from "../films";

export function FilmMainComponent(props) {
  const params = useParams();
  const filter = params.filterType;

  return FilmFilter.contains(filter) ? (
    <FilmMain
      filter={filter}
      films={props.films}
      updateFilm={props.updateFilm}
      removeFilm={props.removeFilm}
    />
  ) : (
    <Page404Component />
  );
}

function FilmMain(props) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const getFilms = async () => {
      const films = await API.getFilmsByFilter(props.filter);
      console.log(films);
      setFilms(films);
    };
    getFilms();
  }, [props.filter]);

  const updateFavorite = (id, favorite) => {
    setFilms((films) =>
      films.map((f) => {
        if (f.id === id) {
          return new Film(f.id, f.title, favorite, f.watchDate, f.rating);
        } else {
          return f;
        }
      })
    );
  };

  const updateRating = (id, rating) => {
    setFilms((films) =>
      films.map((f) => {
        if (f.id === id) {
          return new Film(f.id, f.title, f.isFavourite, f.watchDate, rating);
        } else {
          return f;
        }
      })
    );
  };

  const deleteFilm = (id) => {
    setFilms((films) => films.filter((f) => f.id !== id));
  };

  return (
    <>
      <Row>
        <Col id="sidebar" as="aside" className="col-4">
          <Sidebar filter={props.filter} />
        </Col>
        <Col as="main" className="col-8">
          <FilmList
            films={films}
            filter={props.filter}
            updateRating={updateRating}
            updateFavorite={updateFavorite}
            deleteFilm={deleteFilm}
          />
        </Col>
      </Row>
      <Link
        to="film/add"
        relative="path"
        variant="primary"
        className="film-form-button btn btn-primary"
      >
        {addIcon}
      </Link>
    </>
  );
}
