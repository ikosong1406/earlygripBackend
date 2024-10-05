const express = require("express");
const router = express.Router();
const Book = require("../Models/Library");
const upload = require("../Utils/multer-config");

router.post(
  "/",
  upload.fields([{ name: "bookcover", maxCount: 1 }]),
  async (req, res) => {
    const {
      title,
      author,
      category,
      publisher,
      yearofpublication,
      description,
    } = req.body;

    try {
      const bookcover = req.files["bookcover"]
        ? req.files["bookcover"][0].path
        : null;

      const newBook = await Book.create({
        title: title,
        author: author,
        category: category,
        publisher: publisher,
        yearofpublication: yearofpublication,
        description: description,
        bookcover: bookcover,
      });

      return res.status(200).json({
        status: "ok",
        data: "Book Created",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
