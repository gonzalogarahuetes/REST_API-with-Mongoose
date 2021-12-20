const db = require("../models");

async function createUser(req, res, next) {
  try {
    const newData = req.body;
    const dbRes = await db.User.create(newData);

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const dbRes = await db.User.find(
      {},
      { firstName: 1, lastName: 1, email: 1 },
    )
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

async function getSingleUser(req, res, next) {
  try {
    const userId = req.params.userId;

    const dbRes = await db.User.find(
      {
        _id: userId,
      },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
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

async function updateUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const newData = req.body;

    // const dbRes = await db.User.findByIdAndUpdate(UserId, newData);

    const dbRes = await db.User.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          firstName: newData.firstName,
          lastName: newData.lastName,
          email: newData.email,
        },
        $push: {
          speaks: newData.speaks,
        },
      },
      { new: true, runValidator: true },
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

async function deleteUser(req, res, next) {
  try {
    const userId = req.params.userId;

    const dbRes = await db.User.deleteOne({
      _id: userId,
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

async function signUp(req, res, next) {
  try {
    const { uid, email } = req.user;

    const user = await db.User.findOne({ email: email });

    if (user) return res.status(200);

    const newUser = await db.User.create({
      _id: uid,
      email: email,
    });
    res.status(201);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  signUp: signUp,
};
