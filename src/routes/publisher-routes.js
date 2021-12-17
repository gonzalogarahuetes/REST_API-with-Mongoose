const { Router } = require("express");

const publisherController = require("../controllers/publisher-controller");

const PublisherRouter = new Router();

PublisherRouter.get("/", publisherController.getAllPublishers);

PublisherRouter.get("/:publisherId", publisherController.getSinglePublisher);

PublisherRouter.post("/", publisherController.createPublisher);

PublisherRouter.patch("/:publisherId", publisherController.updatePublisher);

PublisherRouter.delete("/:publisherId", publisherController.deletePublisher);

module.exports = PublisherRouter;
