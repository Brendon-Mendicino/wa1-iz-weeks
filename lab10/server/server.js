"use strict";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/routes.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", (res, req, next) => {
  setTimeout(() => next(), 3000);
});
app.use("/api", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
