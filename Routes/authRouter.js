const express = require('express');
const router = express.Router();
const {generateToken} = require('../handlers/handleJWToken.js');
const User = require('../models/User.js');
const {verifyUser} = require('../controllers/authControler.js')
const isRequestEmpty = require("../middleware/isRequestEmpty.js");
const requestLogger = require('../middleware/requestLogger.js');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

//email/phone No verification
router.post('/verify', requestLogger,isRequestEmpty("Either phone No or Email Is required") ,verifyUser)

// Login route
router.post('/login', async (req, res) => {
    try {
        // Log the request body for debugging
        console.log('Request body:', req.body);
        
        // Check if body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: 'Request body is empty',
                error: 'Please provide email and password in the request body'
            });
        }

        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                error: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Login failed',
                error: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Login failed',
                error: 'Invalid credentials'
            });
        }

        // Create token
        const token = generateToken({ id: user._id, email: user.email, username: user.username })

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Login failed',
            error: error.message 
        });
    }
});

module.exports = router;