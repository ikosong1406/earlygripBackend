const express = require("express");
const router = express.Router();
const Staff = require("../Models/Users"); // Assuming the model file is named "Staff.js"
const upload = require("../Utils/multer-config");
const bcrypt = require("bcryptjs"); // For hashing passwords

// Function to generate a 6-digit random password
const generateRandomPassword = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST route to create a new staff member
router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      firstname,
      lastname,
      dateOfBirth,
      gender,
      department,
      contact,
      email,
      role, // unique field for role
      residentialAddress,
      stateOfOrigin,
    } = req.body;

    try {
      // Generate a 6-digit random password
      const plainPassword = generateRandomPassword();

      // Hash the generated password before saving
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      // Get the uploaded files
      const profilePhoto = req.files["photo"]
        ? req.files["photo"][0].path
        : null;
      const cvUpload = req.files["cv"] ? req.files["cv"][0].path : null;
      const certificateUpload = req.files["certificateUpload"]
        ? req.files["certificateUpload"][0].path
        : null;

      // Create a new Staff document
      const newStaff = new Staff({
        firstname: firstname,
        lastname: lastname,
        dateOfBirth: dateOfBirth,
        gender: gender,
        department: department,
        contact: contact,
        email: email,
        role: role, // unique role
        residentialAddress: residentialAddress,
        stateOfOrigin: stateOfOrigin,
        password: hashedPassword, // store the hashed password
        profilePhoto: profilePhoto,
        cvUpload: cvUpload,
        certificateUpload: certificateUpload,
        lessonNote: [], // Empty array initially for lesson notes
      });

      // Save the new staff document to the database
      await newStaff.save();

      // Send the email and the generated password to the frontend
      return res.status(200).json({
        status: "ok",
        message: "Staff information saved successfully",
        data: {
          email: newStaff.email,
          password: plainPassword, // Send the plain password to the frontend
        },
      });
    } catch (err) {
      // Handle errors
      return res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
