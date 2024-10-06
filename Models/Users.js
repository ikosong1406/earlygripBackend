const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Lesson Note Schema
const LessonNoteSchema = new Schema({
  subject: { type: String },
  topic: { type: String },
  date: { type: Date },
  className: { type: String },
  attachment: { type: String },
  text: { type: String },
  status: { type: String },
});

// Staff Schema
const UsersSchema = new Schema(
  {
    profilePhoto: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female"] },
    department: { type: String },
    contact: { type: String },
    email: { type: String },
    role: { type: String },
    residentialAddress: { type: String },
    stateOfOrigin: { type: String },
    cvUpload: { type: String },
    certificateUpload: { type: String },
    lessonNote: [LessonNoteSchema],
    password: { type: String },
    form: { type: String },
    hod: { type: String },
    timetable: {
      type: Map,
      of: [String],
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
