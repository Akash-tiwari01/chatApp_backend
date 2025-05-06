const router = require('express').Router();
const { Router } = require('express');
const { registerUser } = require('../controllers/userController.js');
const isRequestEmpty = require('../middleware/isRequestEmpty.js');
const User = require('../models/User');
require('dotenv').config();


// Register route
router.post('/register',isRequestEmpty("Registration data is required"), registerUser);

module.exports = router