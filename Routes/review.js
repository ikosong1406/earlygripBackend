const express = require("express");
const router = express.Router();
const Staff = require("../Models/Users"); // Import the Staff model

// Route to update the status of a teacher's lesson note
router.put("/", async (req, res) => {
  const { staffId, noteId, newStatus } = req.body; // Get IDs and status from the request body

  try {
    // Find the staff member by their ID
    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Find the specific lesson note by its ID
    const note = staff.lessonNote.id(noteId);

    if (!note) {
      return res.status(404).json({ message: "Lesson note not found" });
    }

    // Update the status of the lesson note
    note.status = newStatus;

    // Save the staff document with the updated note status
    await staff.save();

    return res.status(200).json({
      message: "Lesson note status updated successfully",
      note,
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
