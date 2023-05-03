import { Col, Row } from "react-bootstrap";
import { Sidebar } from "./Sidebar";
import { FilmList } from "./FilmList";
import { Link, useParams } from "react-router-dom";
import { FilmFilter, filterFilmBy, filterType } from "../App";
import Page404Component from "./Page404Component";
import { addIcon } from "../assets/Icons";

export function FilmMainComponent(props) {
  const params = useParams();
  const filter = params.filterType;

  return FilmFilter.contains(filter) ? (
    <FilmMain
      filter={filterType[filter]}
      films={props.films}
      updateFilm={props.updateFilm}
      removeFilm={props.removeFilm}
    />
  ) : (
    <Page404Component />
  );
}

function FilmMain(props) {
  return (
    <>
      <Row>
        <Col id="sidebar" as="aside" className="col-4">
          <Sidebar filter={props.filter} />
        </Col>
        <Col as="main" className="col-8">
          <FilmList
            films={props.films.filter((f) => filterFilmBy(props.filter, f))}
            filter={props.filter}
            updateFilm={props.updateFilm}
            removeFilm={props.removeFilm}
          />
        </Col>
      </Row>
      <Link
        to="film/add"
        relative="path"
        variant="primary"
        className="film-form-button"
      >
        {addIcon}
      </Link>
    </>
  );
}
