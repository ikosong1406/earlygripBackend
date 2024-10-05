const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");

router.get("/", async (req, res) => {
  try {
    const list = await Student.find(); // Fetch all users from the database
    res.json(list); // Send the users as JSON response
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

module.exports = router;
