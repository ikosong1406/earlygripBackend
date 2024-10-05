const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../Models/Users");

const User = mongoose.model("Users");

router.post("/", async (req, res) => {
  const { firstname, lastname, email, role, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      role: role,
      password: encryptedPassword,
    });

    res.send({ status: "ok", data: "Admin Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

module.exports = router;
