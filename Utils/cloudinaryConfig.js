require("dotenv").config(); // Load environment variables

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "duqlw2kta",
  api_key: "918971383572462",
  api_secret: "AdyPimRhbdp9OpsD62S5ez8gbI0",
});

module.exports = cloudinary;
