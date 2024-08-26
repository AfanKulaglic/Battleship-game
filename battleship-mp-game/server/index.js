const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Specify the origin of your frontend
  methods: ['GET', 'POST'], // Allow specific methods
  allowedHeaders: ['Content-Type'] // Allow specific headers
}));

// MongoDB Connection String
const dbUri = 'mongodb://afankul42:<db_password>@undefined/?replicaSet=atlas-133yxn-shard-0&ssl=true&authSource=admin';
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

// Route for handling CORS preflight requests (OPTIONS)
app.options('*', cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
