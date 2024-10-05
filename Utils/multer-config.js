// multer-config.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowedFormats: ["jpeg", "jpg", "png", "pdf", "doc", "docx"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
