import { Router } from "express";
import { deleteFilm, getFilm, getFilms, insertFilm, updateFilm, updateFilmFavorite, updateFilmRating } from "../dao.js";
import { Film, filterType } from "../films.js";
import dayjs from "dayjs";

const router = Router();

router.get("/films", async (req, res) => {
  try {
    res.status(200).json(await getFilms(filterType.all));
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/films", async (req, res) => {
  try {
    const { title, favorite, watchdate, rating } = req.body;
    const film = new Film(0, 1, title, favorite, watchdate && dayjs(watchdate), rating);
    await insertFilm(film);

    res.status(201).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/films", async (req, res) => {
  try {
    const { id, title, favorite, watchdate, rating } = req.body;
    const film = new Film(id, 1, title, favorite, dayjs(watchdate), rating);

    await updateFilm(film);

    res.status(201).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/films/filter/:filterType", async (req, res) => {
  try {
    const filter = req.params.filterType;

    const films = await getFilms(filter);

    res.status(200).json(films);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/films/:id", async (req, res) => {
  try {
    const film = await getFilm(req.params.id);

    res.status(200).json(film);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/films/:id", async (req, res) => {
  try {
    await deleteFilm(req.params.id);

    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/films/:id/rating", async (req, res) => {
  try {
    const { rating } = req.body;

    await updateFilmRating(req.params.id, rating);

    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/films/:id/favorite", async (req, res) => {
  try {
    const { favorite } = req.body;

    await updateFilmFavorite(req.params.id, favorite);

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
