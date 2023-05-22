import { useEffect, useState } from "react";
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
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Page404Component from "./components/Page404Component";
import { FilmMainComponent } from "./components/FilmMainComponent";
import API from "./API";

export const filterType = {
  all: "All",
  favorites: "Favorites",
  best: "Best rated",
  lastmonth: "Seen last month",
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
    case filterType.lastmonth:
      return dayjs().diff(f.watchDate, "month") === 1;
    case filterType.unseen:
      return f.watchDate ? false : true;
    default:
      return false;
  }
}

function App() {
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
          <Route path="/films/:filterType" element={<FilmMainComponent />} />
          <Route
            path="/films/:filterType/film/add"
            element={<FilmForm />}
          />
          <Route
            path="/films/:filterType/film/edit"
            element={<FilmForm />}
          />
          <Route path="/" element={<Navigate to="/films/all" />} />
          <Route path="*" element={<Page404Component />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
