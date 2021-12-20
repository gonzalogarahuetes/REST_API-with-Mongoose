const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const errorMiddleware = require("./middleware/error-middleware");

const { bookRouter, authorRouter, publisherRouter } = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(errorMiddleware);

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/publishers", publisherRouter);

module.exports = app;
