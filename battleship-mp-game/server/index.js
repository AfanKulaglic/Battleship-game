const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB Connection String
const dbUri = 'mongodb+srv://user0:user0@cluster0.hlaij.mongodb.net/';

mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Route to handle username submission
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).send('Username is required');

    const newUser = new User({ username });
    await newUser.save();
    res.status(201).send('User created');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
