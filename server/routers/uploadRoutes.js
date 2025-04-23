require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const { uploadToCloudinary } = require("../controllers/uploadController");

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), uploadToCloudinary);

module.exports = router;
