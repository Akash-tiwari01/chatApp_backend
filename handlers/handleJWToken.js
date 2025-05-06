const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || "This_is_My_SECRET_KEY"

const generateToken = (user)=>{
    return (jwt.sign(
       {...user},
        JWT_SECRET,
        { expiresIn: '1h' }
    ))
    
}



module.exports = {generateToken}