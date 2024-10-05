const express = require("express");
const router = express.Router();
const Event = require("../Models/Events");

router.get("/", async (req, res) => {
  try {
    const list = await Event.find(); // Fetch all users from the database
    res.json(list); // Send the users as JSON response
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

module.exports = router;
