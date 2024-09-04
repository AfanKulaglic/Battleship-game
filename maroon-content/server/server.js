const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Putanja do direktorija za upload
const uploadDir = path.join(__dirname, 'uploads');

// Provjeri da li direktorij postoji, ako ne, kreiraj ga
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup za upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Koristi putanju do direktorija
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// MongoDB povezivanje
mongoose.connect("mongodb+srv://user0:user0@cluster0.hlaij.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Schema = mongoose.Schema;

// Definiranje MongoDB schema
const fileSchema = new Schema({
  title: String,
  filePath: String
});

const FileModel = mongoose.model("File", fileSchema);

// Route za primanje podataka
app.post("/upload", upload.single("file"), (req, res) => {
  const newFile = new FileModel({
    title: req.body.title,
    filePath: req.file.filename
  });
  newFile.save()
    .then(() => res.json({ message: "File uploaded successfully" }))
    .catch((error) => res.status(500).json({ error }));
});

// Route za dohvat svih datoteka
app.get('/files', (req, res) => {
  FileModel.find()
    .then(files => res.json(files))
    .catch(error => res.status(500).json({ error }));
});

// Middleware za posluživanje slika
app.use('/uploads', express.static(uploadDir));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
