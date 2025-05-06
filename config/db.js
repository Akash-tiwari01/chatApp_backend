const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    const mongo_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chatbot'
    try {
        await mongoose.connect('mongodb://localhost:27017/chatbot');
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB; 