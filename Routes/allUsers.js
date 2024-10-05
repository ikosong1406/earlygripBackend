const express = require("express");
const router = express.Router();
const User = require("../Models/Users");

router.get("/", async (req, res) => {
  try {
    const list = await User.find(); // Fetch all users from the database
    res.json(list); // Send the users as JSON response
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Error fetching teachers" });
  }
});

module.exports = router;
