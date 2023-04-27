import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { AppNavbar } from './components/AppNavbar';
import { Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import { Sidebar } from './components/Sidebar';
import { Film, FilmLibrary } from './films';
import dayjs from 'dayjs';
import { FilmList } from './components/FilmList';

export const filterType = {
  all: 'All',
  favorites: 'Favorites',
  best: 'Best rated',
  lastMonth: 'Seen last month',
  unseen: 'Unseen'
}

function filterFilmBy(type, f) {
  switch (type) {
    case filterType.all:
      return true;
    case filterType.favorites:
      return f.isFavourite === true;
    case filterType.best:
      return f.rating === 5;
    case filterType.lastMonth:
      return dayjs().diff(f.watchDate, 'month') === 1;
    case filterType.unseen:
      return f.watchDate ? true : false;
    default:
      return false;
  }
}

const filmLibrary = [
        new Film(1, 'Pulp Fiction', true, dayjs('2023-03-10'), 5),
        new Film(2, '21 Grams', true, dayjs('2023-03-17'), 4),
        new Film(3, 'Star Wars', false),
        new Film(4, 'Matrix', false),
        new Film(5, 'Shrek', false, dayjs('2023-03-21'), 3)
    ];


function App() {
  const [filter, setFilter] = useState(filterType.all);
  const [films, setFilms] = useState(filmLibrary);

  return (
    <>
      <AppNavbar />

      <Container fluid>
        <Row>
          <Col id='sidebar' as='aside' className='col-4'>
            <Sidebar filter={filter} setFilter={setFilter} />
          </Col>
          <Col as='main' className='col-8'>
            <FilmList films={films.filter(f => filterFilmBy(filter, f))} filter={filter} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App