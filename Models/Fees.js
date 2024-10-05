// Fee Schema
const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  session: { type: String, required: true },
  term: { type: String, required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  class: { type: String, required: true },
  feePaid: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Fee", feeSchema);
