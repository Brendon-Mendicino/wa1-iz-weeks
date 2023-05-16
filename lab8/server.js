"use strict";

import { express } from "express";
import { morgan } from "morgan";

const port = 3000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});