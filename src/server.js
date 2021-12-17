const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");

const bookRouter = require("./routes/book-routes");
const authorRouter = require("./routes/author-routes");
const publisherRouter = require("./routes/publisher-routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/publishers", publisherRouter);

module.exports = app;
