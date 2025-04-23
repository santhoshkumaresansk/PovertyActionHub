// =======================
// ENV CONFIG
// =======================
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

// =======================
// IMPORTS
// =======================
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// =======================
// MONGO CONNECTION
// =======================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// =======================
// USER SCHEMA & MODEL
// =======================
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

// =======================
// SIGNUP ROUTE
// =======================
app.post('/api/auth/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser._id, email: newUser.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during signup" });
    }
});

// =======================
// LOGIN ROUTE
// =======================
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during login" });
    }
});

// =======================
// DONATION SCHEMA & ROUTE
// =======================
const donationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['books', 'clothes'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {  // Link donation to user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Donation = mongoose.model('Donation', donationSchema);

app.post('/api/donations', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const { type, quantity, description, imageUrl } = req.body;

        const donation = new Donation({
            type,
            quantity,
            description,
            imageUrl,
            user: user._id
        });

        await donation.save();

        res.status(201).json({ message: "Donation submitted successfully!", donation });
    } catch (error) {
        console.error("Donation POST error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
