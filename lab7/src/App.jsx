import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AppNavbar } from "./components/AppNavbar";
import { Button, Col, Collapse, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import { Film, FilmLibrary } from "./films";
import dayjs from "dayjs";
import { FilmList } from "./components/FilmList";
import { FilmForm } from "./components/FilmForm";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Page404Component from "./components/Page404Component";
import { FilmMainComponent } from "./components/FilmMainComponent";

export const filterType = {
  all: "All",
  favorites: "Favorites",
  best: "Best rated",
  lastMonth: "Seen last month",
  unseen: "Unseen",
};

export class FilmFilter {
  static contains(filter) {
    const filterFinal = filter.toLowerCase();
    return (
      Object.keys(filterType)
        .map((f) => f.toLowerCase())
        .filter((f) => f === filterFinal).length > 0
    );
  }
}

export function filterFilmBy(type, f) {
  switch (type) {
    case filterType.all:
      return true;
    case filterType.favorites:
      return f.isFavourite === true;
    case filterType.best:
      return f.rating === 5;
    case filterType.lastMonth:
      return dayjs().diff(f.watchDate, "month") === 1;
    case filterType.unseen:
      return f.watchDate ? false : true;
    default:
      return false;
  }
}

const filmLibrary = [
  new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5),
  new Film(2, "21 Grams", true, dayjs("2023-03-17"), 4),
  new Film(3, "Star Wars", false),
  new Film(4, "Matrix", false),
  new Film(5, "Shrek", false, dayjs("2023-03-21"), 3),
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState(filterType.all);
  const [films, setFilms] = useState(filmLibrary);
  const [editFilm, setEditFilm] = useState();

  const lastId =
    films.map((f) => f.id).reduce((p, c) => (p > c ? p : c), 0) + 1;

  const addNewFilm = (film) => {
    setFilms((prev) => {
      return [...prev, film];
    });
  };

  const updateFilm = (film) => {
    setFilms((prev) => {
      console.log(film);
      return prev.map((f) => {
        if (f.id === film.id) {
          return new Film(
            film.id,
            film.title,
            film.isFavourite,
            film.watchDate,
            film.rating
          );
        } else {
          return f;
        }
      });
    });
  };

  const removeFilm = (film) => {
    setFilms((prev) => {
      return prev.filter((f) => f.id !== film.id);
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <AppNavbar />

              <Container fluid>
                <Outlet />
              </Container>
            </>
          }
        >
          <Route
            path="/films/:filterType"
            element={
              <FilmMainComponent
                films={films}
                updateFilm={updateFilm}
                removeFilm={removeFilm}
              />
            }
          />
          <Route
            path="/films/:filterType/film/add"
            element={<FilmForm lastId={lastId} addNewFilm={addNewFilm} />}
          />
          <Route
            path="/films/:filterType/film/edit"
            element={<FilmForm updateFilm={updateFilm} />}
          />
          <Route path="*" element={<Page404Component />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
