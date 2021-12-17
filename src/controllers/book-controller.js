const db = require("../models");
const { logger } = require("../config/config");

/**
 * 1. Create the book CRUD controllers
 *
 * 1.1.1 create the book and return it
 *
 * The controller should create a new book from the parameters
 * it receives in the req.body object
 *
 * it will receive the following properties:
 *
 *    title: String
 *    author: String
 *    genre: String
 *    year: Number
 *    pages: Number
 *
 * The controller should return a response that has
 * a `data` property with a value of the `_id`
 * of the newly created book
 *
 * { data: `_idOfTheBookThatWasCreated` }
 *
 * 1.1.2 return a status code of `201`
 *
 * @note
 *
 * If you want to test the endpoint using Postman
 * you will have to first query for a user to get its `_id`
 * to send it to the book endpoint as the `author`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 */
async function createBook(req, res, next) {
  try {
    const data = req.body;
    console.log(data);

    const dbRes = await db.Book.create(data);

    res.status(201).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(res);
  }
}

/**
 * 1. Create the book CRUD controllers
 *
 * 1.2.1 get all the book ids and titles
 *
 * The controller should return an array of all the book titles and ids
 *
 * { data: [{ _id: "...", title: "..." }, ...] }
 *
 * 1.2.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 *
 * And call lean() and exec() on the query
 */
async function getBooks(req, res, next) {
  try {
    const dbRes = await db.Book.find({}, { title: 1 }).lean().exec();

    console.log(dbRes);

    res.status(201).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

/**
 * 1. Create the book CRUD controllers
 *
 * 1.3.1 get the book and author info
 *
 * The controller should fetch the book that has the `_id` it receives
 * as a request param and return the following fields
 * under a data property in the response:
 *
 *     _id
 *     title
 *     pages
 *     author:
 *        _id
 *        firstName
 *        lastName
 *
 * { data: { the book }}
 *
 * @note
 * you will need to use the populate method
 *
 * .populate({ path: "author", select: { field: 1 }})
 *
 * 1.3.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 *
 * And call lean() and exec() on the query
 */
async function getSingleBook(req, res, next) {
  try {
    const id = req.params.bookId;

    console.log(req.params);

    const dbRes = await db.Book.find(
      {
        _id: id,
      },
      {
        title: 1,
        pages: 1,
        author: 1,
      },
    )
      .populate({
        path: "author",
        select: {
          firstName: 1,
          lastName: 1,
        },
      })
      .lean()
      .exec();

    console.log(dbRes);

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

/**
 * 1. Create the book CRUD controllers
 *
 * 1.4.1 update the book and return the updates
 *
 * The controller should fetch the book that has the `_id` it receives
 * as a request param and modify the following fields:
 *
 *     title
 *     pages
 *
 * You can use the `.findOneAndUpdate()` method
 *
 * @note
 * you will have to return the `new` updated document
 * under a `data` property of the response
 *
 * { data: { new doc }}
 *
 * 1.4.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 */
async function updateBook(req, res, next) {
  try {
    const id = req.params.bookId;

    const newData = req.body;

    console.log(id);
    console.log(newData);

    const dbRes = await db.Book.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title: newData.title,
        pages: newData.pages,
      },
      { new: true },
    );

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

/**
 * 1. Create the book CRUD controllers
 *
 * 1.5.1 delete the book and return it
 *
 * The controller should fetch the book that has the `_id` it receives
 * as a request param and delete it from the database
 *
 * You will have to return the deleted document `_id` by using the `.findOneAndDelete()` method
 *
 * { data: { _id: deleted doc id }}
 *
 * 1.5.2 return a status code of `200`
 *
 * @remember
 * Wrap the code in a try/catch statement and call next(error)
 * with the error object that is caught
 */
async function deleteBook(req, res, next) {
  try {
    const bookId = req.params.bookId;
    const dbRes = await db.Book.findOneAndDelete({
      _id: bookId,
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
  createBook: createBook,
  getBooks: getBooks,
  getSingleBook: getSingleBook,
  updateBook: updateBook,
  deleteBook: deleteBook,
};