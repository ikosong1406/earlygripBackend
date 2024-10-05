const express = require("express");
const router = express.Router();
const Fee = require("../Models/Fees"); // Assuming you have a Fee model
const Student = require("../Models/Student"); // Assuming you have a Student model

router.post("/fees", async (req, res) => {
  const {
    session,
    term,
    studentId,
    class: className,
    feePaid,
    amount,
    date,
  } = req.body;

  try {
    // Create a new fee record
    const fee = new Fee({
      session,
      term,
      studentId,
      class: className,
      feePaid,
      amount,
      date,
    });

    await fee.save();

    // Update the student's fee record as well
    await Student.findByIdAndUpdate(studentId, {
      $push: { fees: { session, term, feePaid, amount, date } },
    });

    res.status(200).json({ message: "Fee details saved successfully." });
  } catch (error) {
    console.error("Error saving fee:", error);
    res.status(500).json({ message: "Failed to save fee details." });
  }
});

module.exports = router;
