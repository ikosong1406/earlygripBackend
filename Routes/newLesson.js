const express = require("express");
const router = express.Router();
const Users = require("../Models/Users");

// Route to add a new lesson note
router.post("/", async (req, res) => {
  const { userId, subject, topic, date, className, attachment, text, status } =
    req.body;

  try {
    // Find the user by their ID
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the new lesson note
    const newLessonNote = {
      subject,
      topic,
      date: new Date(date),
      className,
      attachment,
      text,
      status,
    };

    // Add the lesson note to the user's lessonNote array
    user.lessonNote.push(newLessonNote);

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Lesson note added successfully",
    });
  } catch (error) {
    console.error("Error adding lesson note:", error);
    res.status(500).json({ message: "Error adding lesson note", error });
  }
});

module.exports = router;
