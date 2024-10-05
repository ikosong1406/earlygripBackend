const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");

// POST route to create a new event
router.post("/", async (req, res) => {
  const { students } = req.body;

  try {
    // Loop through each student and update their class
    for (const student of students) {
      await Student.findByIdAndUpdate(student.id, {
        className: student.nextClass,
      });
    }

    res.status(200).json({ message: "Students promoted successfully" });
  } catch (error) {
    console.error("Error updating student class:", error);
    res.status(500).json({ error: "Failed to promote students" });
  }
});

module.exports = router;
