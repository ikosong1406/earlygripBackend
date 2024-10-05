const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");

// Route to get student result
router.post("/", async (req, res) => {
  const { studentId, session, term } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
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

    res.json({ subjects: termObj.subjects });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch result" });
  }
});

module.exports = router;
