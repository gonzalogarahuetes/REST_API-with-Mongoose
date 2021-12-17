const db = require("../models");

async function createAuthor(req, res, next) {
  try {
    const newData = req.body;
    const dbRes = await db.Author.create(newData);

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function getAllAuthors(req, res, next) {
  try {
    const dbRes = await db.Author.find({}, { name: 1, lastName: 1, country: 1 })
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

async function getSingleAuthor(req, res, next) {
  try {
    const authorId = req.params.authorId;

    const dbRes = await db.Author.find(
      {
        _id: authorId,
      },
      {
        name: 1,
        lastName: 1,
        country: 1,
      },
    );

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    const authorId = req.params.authorId;
    const newData = req.body;

    // const dbRes = await db.Author.findByIdAndUpdate(authorId, newData);

    const dbRes = await db.Author.updateOne(
      {
        _id: authorId,
      },
      {
        $set: {
          name: newData.name,
          lastName: newData.lastName,
          country: newData.country,
          date_death: newData.date_death,
        },
        $push: {
          spokenLanguages: newData.spokenLanguages,
        },
      },
      { new: true },
    );
    res.status(201).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    const authorId = req.params.authorId;

    const dbRes = await db.Author.deleteOne({
      _id: authorId,
    });

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  createAuthor: createAuthor,
  getAllAuthors: getAllAuthors,
  getSingleAuthor: getSingleAuthor,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor,
};
