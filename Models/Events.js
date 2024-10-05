const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Event schema
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  color: { type: String, required: true }, // Color for event display
});

module.exports = mongoose.model("Event", EventSchema);
