'use strict';

const dayjs = require("dayjs");

// 0

function firstLastChars(strings = []) {
  strings.forEach(s => {
    if (s.length < 2) {
      console.log('');
      return;
    }

    if (s.length === 2) {
      console.log(s+s);
      return;
    }

    if (s.length === 3) {
      console.log(s[0]+s[1]+s[1]+s[2]);
      return;
    }

    console.log(s.slice(0, 2) + s.slice(s.length-2, s.length));
  });
}



firstLastChars([
'okok',
'f',
'abc',
'ab',
'asdfkjl'
]);





// 1.

function Film(id, title, isFavourite=false, watchDate=null, rating=null) {
  this.id = id;
  this.title = title;
  this.isFavourite = isFavourite;
  this.watchDate = watchDate;
  this.rating = rating;
};

function FilmLibrary() {
  this.films = [];
  this.addNewFilm = (film) => this.films.push(film);

  this.sortByDate = () => [...this.films].sort((a, b) => {
    if (b.watchDate == null) {
      return -1;
    }
    if (a.watchDate == null) {
      return 1;
    }

    return (a.watchDate.isAfter(b.watchDate)) ? 1 : -1;
  });

  this.resetWatchedFilms = () => {this.films = [];};

  this.getRated = () => [...this.films]
    .filter(f => f.rating != null)
    .sort((a, b) => b - a);
};




const films = [
  new Film(1, 'Pulp Fiction', true, dayjs('2023-03-10'), 5),
  new Film(2, '21 Grams', true, dayjs('2023-03-17'), 4),
  new Film(3, 'Star Wars', false),
  new Film(4, 'Matrix', false),
  new Film(5, 'Shrek', false, dayjs('2023-03-21'), 3)
];

const library = new FilmLibrary();

films.forEach(f => library.addNewFilm(f));

console.log(library);



// 2.

console.log(library.sortByDate());

console.log(library.getRated());

library.resetWatchedFilms();

console.log(library.films);





