const User = require('../models/User')
const {generateToken} = require('../handlers/handleJWToken')


const registerUser = async (req, res) => {
    try {
        // Log the request body for debugging
        console.log('Request body:', req.body);
        
        // Check if body is empty
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                error: 'Username, email, and password are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Registration failed',
                error: 'User already exists with this email'
            });
        }

        // Create new user
        const user = await User.create({
            username,
            email,
            password
        });


        // Create token
        const token = generateToken( { id: user._id, email: user.email, username: user.username })

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:',error);
        res.status(500).json({ 
            message: 'Registration failed',
            error
        });
    }
}




module.exports= {registerUser}