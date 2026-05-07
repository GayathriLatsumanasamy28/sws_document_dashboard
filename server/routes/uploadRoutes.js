const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

router.post("/", upload.array("files"), (req, res) => {
  res.status(200).json({
    message: "Files uploaded successfully",
    files: req.files,
  });
});

module.exports = router;