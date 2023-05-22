"use strict";

import dayjs from "dayjs";
import { Film } from "./films.js";

const PORT = 3000;
const baseUrl = "http://localhost:3000/api";

const filmDeserialize = (f) => {
  return new Film(
    f.id,
    f.title,
    f.favorite,
    f.watchdate && dayjs(f.watchdate),
    f.rating
  );
};

/**
 *
 * @param {Film} f
 * @returns
 */
const filmSerialize = (f) => ({
  title: f.title,
  favorite: f.isFavourite,
  watchdata: f.watchDate && f.watchDate.format("YYYY-MM-DD"),
  rating: f.rating,
});

const API = {};

API.getFilms = async () => {
  const res = await fetch(`${baseUrl}/films`);
  if (!res) {
    return new Error();
  }

  const json = await res.json();
  return json.map((f) => filmDeserialize(f));
};

API.getFilmsByFilter = async (filter) => {
  const res = await fetch(`${baseUrl}/films/filter/${filter}`);
  if (!res) {
    return new Error();
  }

  const json = await res.json();
  return json.map((f) => filmDeserialize(f));
};

API.getFilmById = async (id) => {
  const res = await fetch(`${baseUrl}/films/${id}`);
  if (!res) {
    return new Error();
  }

  const json = await res.json();
  return filmDeserialize(json);
};

API.getFilmById = async (id) => {
  const res = await fetch(`${baseUrl}/films/${id}`);
  if (!res) {
    return new Error();
  }

  const json = await res.json();
  return filmDeserialize(json);
};

API.deleteFilmById = async (id) => {
  const res = await fetch(`${baseUrl}/films/${id}`, { method: "DELETE" });
  if (!res) {
    return new Error();
  }
};

/**
 *
 * @param {Film} film
 * @returns
 */
API.addFilm = async (film) => {
  const res = await fetch(`${baseUrl}/films`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film.serverSerialize()),
  });
  if (!res) {
    return new Error();
  }
};

/**
 *
 * @param {Film} film
 * @returns
 */
API.updateFilm = async (film) => {
  const res = await fetch(`${baseUrl}/films`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...film.serverSerialize(),
    }),
  });
  if (!res) {
    return new Error();
  }
  console.log(res);
};

API.updateRating = async (id, rating) => {
  rating = !rating ? 0 : rating;

  const res = await fetch(`${baseUrl}/films/${id}/rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: rating }),
  });
  if (!res) {
    return new Error();
  }
};

API.updateFavorite = async (id, favorite) => {
  const res = await fetch(`${baseUrl}/films/${id}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorite: favorite,
    }),
  });
  if (!res) {
    return new Error();
  }
};

export default API;
