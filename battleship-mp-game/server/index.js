const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// CORS Options
const corsOptions = {
    origin: ['http://localhost:5173'],  // Enable requests from local and hosted frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));  // Enable CORS with options

// MongoDB Connection String
const dbUri = 'mongodb+srv://user0:user0@cluster0.hlaij.mongodb.net/';

mongoose.connect(dbUri, {
    serverSelectionTimeoutMS: 5000, // Increase timeout to 50 seconds
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Ship Schema and Model
const shipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    board: { type: [[Number]], required: true } // 2D array representing the board
});
const Ship = mongoose.model('Ship', shipSchema);

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

// Route to save ship placement for a user
app.post('/api/ships', async (req, res) => {
    try {
        const { userId, board } = req.body;
        if (!userId || !board) return res.status(400).send('User ID and board are required');

        // Find the user to ensure they exist (optional)
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        // Save the ship configuration
        const newShip = new Ship({ userId, board });
        await newShip.save();
        res.status(201).send('Ships saved');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
});

// Handle preflight requests
app.options('*', cors(corsOptions)); // Pre-flight requests

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
