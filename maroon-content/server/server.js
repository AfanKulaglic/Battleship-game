// server.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Initialize Express
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema for form data
const FormDataSchema = new mongoose.Schema({
  title: String,
  file: String,
});

const FormData = mongoose.model('FormData', FormDataSchema);

// Routes
app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const { titles } = req.body;
    const files = req.files.map(file => file.path);

    const formData = titles.map((title, index) => ({
      title,
      file: files[index],
    }));

    await FormData.insertMany(formData);
    res.status(200).json({ message: 'Files uploaded and data saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading files and saving data', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
