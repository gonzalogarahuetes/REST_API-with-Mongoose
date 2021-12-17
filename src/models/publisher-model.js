const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  creationDate: {
    type: Date,
  },
  authors: {
    type: [mongoose.Types.ObjectId],
    ref: "authors",
  },
  books: {
    type: [mongoose.Types.ObjectId],
    ref: "books",
  },
});

const PublisherModel = new mongoose.model("publishers", PublisherSchema);

module.exports = PublisherModel;
