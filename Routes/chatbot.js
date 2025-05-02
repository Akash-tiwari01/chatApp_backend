const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Ask question
router.post('/ask', authenticate, async (req, res) => {
    try {
        const { question } = req.body;
        const userId = req.user.id;

        if (!question) {
            return res.status(400).json({ message: 'Question is required' });
        }

        // Here you can implement your chatbot logic
        // For now, we'll just store the question and return a simple response
        const answer = "This is a sample response. Implement your chatbot logic here.";

        // Save chat to database
        const chat = new Chat({
            user: userId,
            question,
            answer
        });

        await chat.save();

        res.json({ answer });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get chat history
router.get('/history', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const chats = await Chat.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(chats);
    } catch (error) {
        console.error('History error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;