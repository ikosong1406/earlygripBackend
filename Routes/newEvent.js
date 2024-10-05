const express = require("express");
const router = express.Router();
const Event = require("../Models/Events"); // Assuming Event model is in the 'models' folder

// POST route to create a new event
router.post("/", async (req, res) => {
  const { title, description, date, color } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      color,
    });

    await newEvent.save();

    return res.status(200).json({
      // status: "ok",
      data: "Event created successfully",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
