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
  authors: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "author",
    },
  ],
  books: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "book",
    },
  ],
});

const PublisherModel = new mongoose.model("publisher", PublisherSchema);

module.exports = PublisherModel;
