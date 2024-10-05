const express = require("express");
const router = express.Router();
const Student = require("../Models/Student"); // Import the Student model

// Route to get the student's result based on pin, session, and term
router.post("/", async (req, res) => {
  const { pin, session, term } = req.body;

  try {
    // Find the student using the provided pin
    const student = await Student.findOne({ pin });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.feeStatus !== "paid") {
      return res.status(403).json({
        message: "Student has not paid for this term, cannot view result",
      });
    }

    // Find the session
    const sessionObj = student.results.find((res) => res.session === session);
    if (!sessionObj) {
      return res.json({ message: "No result yet" });
    }

    // Find the term
    const termObj = sessionObj.terms.find((t) => t.term === term);
    if (!termObj) {
      return res.json({ message: "No result yet" });
    }

    res.json({
      firstname: student.firstname,
      lastname: student.lastname,
      className: student.className,
      position: termObj.position,
      subjects: termObj.subjects,
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
