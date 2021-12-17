const db = require("../models");

async function getAllPublishers(req, res, next) {
  try {
    const dbRes = await db.Publisher.find({}, { name: 1, creationDate: 1 })
      .lean()
      .exec();

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function getSinglePublisher(req, res, next) {
  try {
    const publisherId = req.params.publisherId;

    const dbRes = await db.Publisher.find(
      {
        _id: publisherId,
      },
      {
        name: 1,
        creationDate: 1,
        books: 1,
        authors: 1,
      },
    )
      .populate({
        path: "book",
        select: {
          title: 1,
          pages: 1,
        },
      })
      .populate({
        path: "author",
        select: {
          name: 1,
          lastName: 1,
          country: 1,
        },
      })
      .lean()
      .exec();

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    next(err);
  }
}

async function createPublisher(req, res, next) {
  try {
    const newData = req.body;

    const dbRes = await db.Publisher.create(newData);

    res.status(201).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function updatePublisher(req, res, next) {
  try {
    const publisherId = req.params.publisherId;

    const newData = req.body;

    const dbRes = await db.Publisher.findOneAndUpdate(publisherId, newData);

    res.status(202).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    next(err);
  }
}

async function deletePublisher(req, res, next) {
  try {
    const publisherId = req.params.publisherId;

    const dbRes = await db.Publisher.findOneAndRemove({
      _id: publisherId,
    });

    res.status(202).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  getAllPublishers: getAllPublishers,
  getSinglePublisher: getSinglePublisher,
  createPublisher: createPublisher,
  updatePublisher: updatePublisher,
  deletePublisher: deletePublisher,
};
