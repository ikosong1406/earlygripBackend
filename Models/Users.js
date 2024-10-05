const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Lesson Note Schema
const LessonNoteSchema = new Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  date: { type: Date, required: true },
  class: { type: String, required: true },
  attachment: { type: String, required: true },
  text: { type: String, required: true },
  status: { type: String, required: true },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
