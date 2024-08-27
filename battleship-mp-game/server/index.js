const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// CORS Options
const corsOptions = {
    origin: ['http://localhost:5173'],  // Omogući zahteve sa lokalnog i hostovanog front-end-a
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));  // Enable CORS with options

// MongoDB Connection String
const dbUri = 'mongodb+srv://user0:user0@cluster0.hlaij.mongodb.net/';

mongoose.connect(dbUri, {
    serverSelectionTimeoutMS: 5000, // povećaj timeout na 50 sekundi
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    ships: {
        type: Array,
        default: []  // Inicijalno prazan niz za brodove
    }
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

// PUT ruta za ažuriranje brodova korisnika
app.put('/api/users/:userId/ships', async (req, res) => {
    const { userId } = req.params;
    const { ships } = req.body; // ships će biti niz matrica koje opisuju položaj brodova
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.ships = ships;
        await user.save();

        res.status(200).send('Ships updated');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
});


// Handle preflight requests
app.options('*', cors(corsOptions)); // Pre-flight requests

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
