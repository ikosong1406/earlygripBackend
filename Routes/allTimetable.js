const express = require("express");
const router = express.Router();
const User = require("../Models/Users");

// POST route to create a new event
router.post("/", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ timetable: user.timetable });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving timetable", error });
  }
});

module.exports = router;
