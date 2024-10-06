const express = require("express");
const router = express.Router();
const User = require("../Models/Users");

// POST route to create a new event
router.post("/", async (req, res) => {
  const { userId, timetable } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save or update the timetable in the user schema
    user.timetable = timetable;
    await user.save();
    res.json({ message: "Timetable saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving timetable", error });
  }
});

module.exports = router;
