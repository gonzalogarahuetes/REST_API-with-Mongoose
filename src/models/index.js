const BookModel = require("./book-model");
const AuthorModel = require("./author-model");
const PublisherModel = require("./publisher-model");

module.exports = {
  Book: BookModel,
  Author: AuthorModel,
  Publisher: PublisherModel,
};
