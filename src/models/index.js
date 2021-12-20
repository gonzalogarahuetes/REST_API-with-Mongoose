const BookModel = require("./book-model");
const AuthorModel = require("./author-model");
const PublisherModel = require("./publisher-model");
const UserModel = require("./user-model");

module.exports = {
  Book: BookModel,
  Author: AuthorModel,
  Publisher: PublisherModel,
  User: UserModel,
};
