const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Subject schema for storing individual subject results
const SubjectSchema = new Schema({
  subjectName: { type: String }, // Add subject name
  firstTest: { type: Number },
  secondTest: { type: Number },
  exam: { type: Number },
  total: { type: Number },
  grade: { type: String },
});

// Term schema for storing results of a term
const TermResultSchema = new Schema({
  term: { type: String }, // e.g., 'First Term'
  position: { type: String },
  subjects: [SubjectSchema], // Array of subjects
});

// Session schema for storing results of each session
const SessionResultSchema = new Schema({
  session: { type: String }, // e.g., '2024/2025'
  terms: [TermResultSchema], // Array of terms
});

// Fees schema for storing payment status of each term dynamically
const SessionFeesSchema = new Schema({
  session: { type: String }, // Store the session as a key (e.g., "2022/2023")
  fees: { type: String, enum: ["paid", "notPaid"] }, // Term fee status
});

// Student schema
const StudentSchema = new Schema({
  picture: { type: String },
  firstname: { type: String },
  middlename: { type: String },
  lastname: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["Male", "Female"] },
  pin: { type: Number },
  className: { type: String },
  section: { type: String },
  stateOfOrigin: { type: String },
  residentialAddress: { type: String },
  parentName: { type: String },
  parentNumber: { type: String },
  parentEmail: { type: String },
  feeStatus: { type: String, enum: ["paid", "notPaid"], default: "notPaid" },
  results: [SessionResultSchema], // Array of session results, each containing dynamic terms and subjects
  fees: [SessionFeesSchema], // Array of session fees
});

module.exports = mongoose.model("Student", StudentSchema);
