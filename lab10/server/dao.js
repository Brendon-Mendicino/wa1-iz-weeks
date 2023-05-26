"use strict";
/* Data Access Object (DAO) module for accessing Q&A */
/* Initial version taken from exercise 4 (week 03) */
import sqlite from "sqlite3";
import { Film } from "./films.js";

// open the database
const db = new sqlite.Database("./films.db", (err) => {
  if (err) throw err;
});

export const getFilms = async (filter) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films";

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }

      const films = rows
        .map((r) => Film.deserialize(r))
        .filter((f) => Film.filterFilm(f, filter))
        .map((f) => f.serialize());

      resolve(films);
    });
  });
};

export const insertFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO films (title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?)";

    const s = film.serialize();

    db.run(sql, [s.title, s.favorite, s.watchdate, s.rating, s.user], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export const updateFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE films SET title=?, favorite=?, watchdate=?, user=?, rating=? WHERE id=?";

    const s = film.serialize();

    db.run(
      sql,
      [s.title, s.favorite, s.watchdate, s.user, s.rating, s.id],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
};

export const getFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE id=?";

    db.get(sql, [id], (err, row) => {
      if (err) reject(err);

      console.log(row);
      resolve(Film.deserialize(row));
    });
  });
};

export const deleteFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM films WHERE id=?";

    db.run(sql, [id], (err) => {
      if (err) reject(err);

      resolve();
    });
  });
};

export const updateFilmRating = (id, rating) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE films SET rating=? WHERE id=?";

    db.run(sql, [rating, id], (err) => {
      if (err) reject(err);

      resolve();
    });
  });
};

export const updateFilmFavorite = (id, favorite) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE films SET favorite=? WHERE id=?";

    db.run(sql, [favorite, id], (err) => {
      if (err) reject(err);

      resolve();
    });
  });
};
