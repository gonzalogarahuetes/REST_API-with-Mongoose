const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    date_birth: {
      type: Date,
    },
    date_death: {
      type: Date,
    },
    country: {
      type: String,
      required: true,
    },
    spokenLanguages: {
      type: [String],
      enum: ["Spanish", "English", "Chinese", "Japanese", "Portuguese"],
    },
  },
  { timestamps: true },
);

const AuthorModel = new mongoose.model("author", AuthorSchema);

module.exports = AuthorModel;
