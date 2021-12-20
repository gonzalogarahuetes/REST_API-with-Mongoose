const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const config = require("./config/config");
const {
  bookRouter,
  authorRouter,
  publisherRouter,
  userRouter,
} = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.URL,
  }),
);

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/publishers", publisherRouter);
app.use(userRouter);

module.exports = app;
