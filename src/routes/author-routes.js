const Router = require("express").Router;
const authorController = require("../controllers/author-controller");

const authorRouter = Router();

authorRouter.get("/", authorController.getAllAuthors);

authorRouter.get("/:authorId", authorController.getSingleAuthor);

authorRouter.put("/", authorController.createAuthor);

authorRouter.patch("/:authorId", authorController.updateAuthor);

authorRouter.delete("/:authorId", authorController.deleteAuthor);

module.exports = authorRouter;
