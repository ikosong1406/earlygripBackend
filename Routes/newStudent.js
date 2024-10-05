const express = require("express");
const router = express.Router();
const Student = require("../Models/Student"); // Assuming the model file is named "Student.js"
const upload = require("../Utils/multer-config");

const generateRandomPin = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
};

router.post(
  "/",
  upload.fields([{ name: "studentPhoto", maxCount: 1 }]), // Ensure correct field name
  async (req, res) => {
    const {
      firstname,
      middlename,
      lastname,
      dateOfBirth,
      gender,
      className,
      section,
      stateOfOrigin,
      residentialAddress,
      parentName,
      parentNumber,
      parentEmail,
    } = req.body;

    try {
      // Ensure correct field name for file input
      const studentphoto = req.files["studentPhoto"]
        ? req.files["studentPhoto"][0].path
        : null;

      // Generate random PIN for the student
      const pin = generateRandomPin();

      // Create a new Student document
      const newStudent = await Student.create({
        picture: studentphoto,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        dateOfBirth: new Date(dateOfBirth),
        gender: gender,
        pin: pin,
        className: className,
        section: section,
        stateOfOrigin: stateOfOrigin,
        residentialAddress: residentialAddress,
        parentName: parentName,
        parentNumber: parentNumber,
        parentEmail: parentEmail,
        results: [], // Initialize with an empty array for results
        fees: [], // Initialize with an empty array for fees
      });

      // Respond with success message
      return res.status(200).json({
        status: "ok",
        data: "Student information saved successfully",
      });
    } catch (err) {
      // Handle errors
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
