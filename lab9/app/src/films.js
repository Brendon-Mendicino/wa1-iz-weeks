"use strict";

import dayjs from "dayjs";

export class Film {
  constructor(id, title, isFavourite = false, watchDate = null, rating = null) {
    this.id = id;
    this.title = title;
    this.isFavourite = isFavourite;
    /**
     * @type {dayjs.Dayjs}
     */
    this.watchDate = watchDate;
    this.rating = rating;

    this.watchDateFormatted = () =>
      this.watchDate && this.watchDate.format("MMMM DD, YYYY");

    this.serialize = () => {
      return {
        id: this.id,
        title: this.title,
        isFavourite: this.isFavourite,
        watchDate: this.watchDate?.format("YYYY-MM-DD"),
        rating: this.rating,
      };
    };
  }

  serverSerialize() {
    return {
      id: this.id,
      title: this.title,
      favorite: this.isFavourite,
      watchdate: this.watchDate?.format("YYYY-MM-DD"),
      rating: this.rating,
    };
  }

  static deserialize(f) {
    return new Film(
      f.id,
      f.title,
      f.isFavourite,
      f.watchDate && dayjs(f.watchDate),
      f.rating
    );
  }
}

export class FilmLibrary {
  constructor() {
    this.films = [
      new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5),
      new Film(2, "21 Grams", true, dayjs("2023-03-17"), 4),
      new Film(3, "Star Wars", false),
      new Film(4, "Matrix", false),
      new Film(5, "Shrek", false, dayjs("2023-03-21"), 3),
    ];

    this.addNewFilm = (film) => this.films.push(film);

    this.sortByDate = () =>
      [...this.films].sort((a, b) => {
        if (b.watchDate == null) {
          return -1;
        }
        if (a.watchDate == null) {
          return 1;
        }

        return a.watchDate.isAfter(b.watchDate) ? 1 : -1;
      });

    this.resetWatchedFilms = () => {
      this.films = [];
    };

    this.getRated = () =>
      [...this.films].filter((f) => f.rating != null).sort((a, b) => b - a);

    this.getFavorites = () => [...this.films].filter((f) => f.isFavourite);

    this.getBestRated = () => [...this.films].filter((f) => f.rating === 5);

    this.getLastMonth = () =>
      [...this.films].filter((f) => dayjs().diff(f.watchDate, "month") === 1);

    this.getUnseen = () =>
      [...this.films].filter((f) => (f.watchDate ? false : true));

    this.deleteFilm = (title) => {
      this.films = this.films.filter((f) => f.title !== title);
      this.listeners.forEach((l) => l(title));
    };

    this.listeners = [];
    this.addEventListener = (listener) => {
      this.listeners.add(listener);
    };
  }
}
