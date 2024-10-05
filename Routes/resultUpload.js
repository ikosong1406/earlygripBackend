// routes/studentResult.js
const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");

// Route to add or update student result for a specific session and term
router.post("/", async (req, res) => {
  const {
    studentId,
    session,
    term,
    position,
    subjectName,
    firstTest,
    secondTest,
    exam,
    total,
    grade,
  } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the session already exists
    const sessionIndex = student.results.findIndex(
      (s) => s.session === session
    );
    if (sessionIndex === -1) {
      // Create a new session if it doesn't exist
      student.results.push({
        session,
        terms: [
          {
            term,
            position,
            subjects: [
              {
                subjectName: subjectName,
                firstTest,
                secondTest,
                exam,
                total,
                grade,
              },
            ],
          },
        ],
      });
    } else {
      // Session exists, check for the term
      const termIndex = student.results[sessionIndex].terms.findIndex(
        (t) => t.term === term
      );
      if (termIndex === -1) {
        // Create a new term if it doesn't exist
        student.results[sessionIndex].terms.push({
          term,
          position,
          subjects: [
            {
              subjectName: subjectName,
              firstTest,
              secondTest,
              exam,
              total,
              grade,
            },
          ],
        });
      } else {
        // Term exists, check for the subject
        const subjectIndex = student.results[sessionIndex].terms[
          termIndex
        ].subjects.findIndex((s) => s.name === subjectName);

        if (subjectIndex === -1) {
          // Add the subject if it doesn't exist
          student.results[sessionIndex].terms[termIndex].subjects.push({
            subjectName: subjectName,
            firstTest,
            secondTest,
            exam,
            total,
            grade,
          });
        } else {
          // Update the existing subject
          student.results[sessionIndex].terms[termIndex].subjects[
            subjectIndex
          ] = {
            subjectName: subjectName,
            firstTest,
            secondTest,
            exam,
            total,
            grade,
          };
        }
      }
    }

    // Save the student document
    await student.save();

    // Return a success response
    res.status(200).json({ message: "Result uploaded successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to upload result" });
  }
});

module.exports = router;
