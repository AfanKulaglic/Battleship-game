const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Directory for uploads
const uploadDir = path.join(__dirname, 'uploads');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect("mongodb+srv://user0:user0@cluster0.hlaij.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Schema = mongoose.Schema;

// Define MongoDB schemas
const fileSchema = new Schema({
  title: String,
  filePath: String,
  type: String, // 'news' or 'video'
  category: String, // New field for video category
  videoFilePath: String, // Field for video file path
  imageFilePath: String // Field for image file path
});

const FileModel = mongoose.model("File", fileSchema);

// Route for news file upload
app.post("/upload-news", upload.single("file"), (req, res) => {
  const newFile = new FileModel({
    title: req.body.title,
    filePath: req.file.filename,
    type: 'news'
  });
  newFile.save()
    .then(() => res.json({ message: "News file uploaded successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Route for video file upload
app.post("/upload-video", upload.fields([{ name: 'file' }, { name: 'image' }]), (req, res) => {
  const newFile = new FileModel({
    title: req.body.title,
    filePath: req.files['file'][0].filename,
    type: 'video',
    category: req.body.category,
    videoFilePath: req.files['file'][0].filename,
    imageFilePath: req.files['image'][0].filename
  });
  newFile.save()
    .then(() => res.json({ message: "Video file uploaded successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Route to get all files
app.get("/files", (req, res) => {
  FileModel.find()
    .then((files) => res.json(files))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// Start server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
