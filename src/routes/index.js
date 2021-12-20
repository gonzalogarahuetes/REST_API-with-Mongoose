const bookRouter = require("./book-routes");
const authorRouter = require("./author-routes");
const publisherRouter = require("./publisher-routes");
const userRouter = require("./user-routes");

module.exports = {
  bookRouter: bookRouter,
  authorRouter: authorRouter,
  publisherRouter: publisherRouter,
  userRouter: userRouter,
};
