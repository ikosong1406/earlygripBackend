const express = require("express");
const router = express.Router();
const Event = require("../Models/Events"); // Assuming Event model is in the 'models' folder

// POST route to create a new event
router.post("/", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

module.exports = router;
