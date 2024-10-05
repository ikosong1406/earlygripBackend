const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  category: {
    type: String,
  },
  publisher: {
    type: String,
  },
  yearofpublication: {
    type: Date,
  },
  description: {
    type: String,
  },
  bookcover: {
    type: String,
  },
});

module.exports = mongoose.model("Library", librarySchema);
