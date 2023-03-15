'use strict';

const dayjs = require("dayjs");
const sqlite = require("sqlite3");


const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });


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


function toFilmModel(film) {
  return new Film(
    film.id,
    film.title,
    film.favorite,
    film.watchdate,
    film.rating
  );
}


function Film(id, title, isFavourite=false, watchDate=null, rating=null) {
  this.id = id;
  this.title = title;
  this.isFavourite = isFavourite;
  this.watchDate = watchDate ? dayjs(watchDate) : null;
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

  this.getAllFilms = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films;";
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        console.log(rows);
        resolve(rows.map(f => toFilmModel(f)));
      });
    });
  };

  this.getAllFavourites = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films WHERE favorite=true";

      db.all(query, (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(f => toFilmModel(f)));
      });
    });
  };

  this.getWatchedTodayFilms = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films;";

      db.all(query, (err, rows) => {
        if (err) return reject(err);
        resolve(rows
          .map(f => toFilmModel(f))
          .filter(f => f.watchDate ? dayjs().isSame(f.watchDate.day, 'day') : false)
        );
      });
    });
  };

  this.getWatchedBeforeDateFilms = (date) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films WHERE watchdate < ?;";

      db.all(query, [date], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(f => toFilmModel(f))
        );
      });
    });
  };

  this.getRatedGreaterThenFilms = (rating) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films WHERE rating>=?;";

      db.all(query, [rating], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(f => toFilmModel(f))
        );
      });
    });
  };

  this.getFilmsWithStringInTitle = (match) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films WHERE title LIKE ?;";

      db.all(query, ['%'+match+'%'], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(f => toFilmModel(f))
        );
      });
    });
  };

  this.storeFilm = (film) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO films VALUES (?, ?, ?, ?, ?);";

      db.run(query, [film.id, film.title, film.isFavourite, film.watchDate, film.rating], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };

  this.deleteFilmFromId = (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM films WHERE id=?;";

      db.run(query, [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };

  this.removeAllWatchDates = () => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE films SET watchdate=NULL;";

      db.run(query, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };
};





async function main() {

  const library = new FilmLibrary();

  await library.getAllFilms()
    .then(rows => {
      console.log(rows);
    });

  await library.getAllFavourites()
    .then(rows => {
      console.log(rows);
    });

  await library.getWatchedTodayFilms()
    .then(rows => {
      console.log(rows);
    });

  await library.getWatchedBeforeDateFilms('2023-03-18')
    .then(rows => {
      console.log(rows);
    });

  await library.getRatedGreaterThenFilms(3)
    .then(rows => {
      console.log(rows);
    });

  await library.getFilmsWithStringInTitle('s')
    .then(rows => {
      console.log(rows);
    });

  await library.storeFilm(new Film(10, "Sium"))
    .then(() => {
      console.log('Successful insert!');
    })
    .catch(err => console.log(err));

  await library.getAllFilms()
    .then(rows => {
      console.log(rows);
    });

  await library.deleteFilmFromId(10)
    .then(() => console.log('Seccessful remove!'))
    .catch(err => console.log(err));

  await library.removeAllWatchDates()
    .then(() => console.log('Seccessful reset!'))
    .catch(err => console.log(err));
};





main();
