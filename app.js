const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const allBook = require("./Routes/allBook");
const allEvent = require("./Routes/allEvent");
const allStudent = require("./Routes/allStudent");
const allTeacher = require("./Routes/allUsers");
const login = require("./Routes/login");
const newBook = require("./Routes/newBook");
const newEvent = require("./Routes/newEvent");
const newStudent = require("./Routes/newStudent");
const newTeacher = require("./Routes/newTeacher");
const register = require("./Routes/register");
const promotion = require("./Routes/promotion");
const deleteEvent = require("./Routes/deleteEvent");
const userData = require("./Routes/userdata");
const getStudentResult = require("./Routes/getStudentResult");
const resultUpload = require("./Routes/resultUpload");
const result = require("./Routes/result");

const PORT = process.env.PORT || 5001;

const mongoUrl =
  "mongodb+srv://alexandervirtuous14:Earlygrip@database.zfh7c.mongodb.net/?retryWrites=true&w=majority&appName=Database";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/allBook", allBook);
app.use("/allEvent", allEvent);
app.use("/allStudent", allStudent);
app.use("/allTeacher", allTeacher);
app.use("/login", login);
app.use("/newBook", newBook);
app.use("/newEvent", newEvent);
app.use("/newStudent", newStudent);
app.use("/newTeacher", newTeacher);
app.use("/register", register);
app.use("/promotion", promotion);
app.use("/deleteEvent", deleteEvent);
app.use("/userData", userData);
app.use("/getStudentResult", getStudentResult);
app.use("/resultUpload", resultUpload);
app.use("/result", result);

app.listen(PORT, () => {
  console.log("Server Started");
});
