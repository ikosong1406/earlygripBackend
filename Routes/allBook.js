const express = require("express");
const router = express.Router();
const Library = require("../Models/Library");

router.get("/", async (req, res) => {
  try {
    const list = await Library.find(); // Fetch all users from the database
    res.json(list); // Send the users as JSON response
  } catch (error) {
    console.error("Error fetching library:", error);
    res.status(500).json({ message: "Error fetching library" });
  }
});

module.exports = router;
