const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.js')
const { default: cors } = require('./middleware/cors.js');
const userRouter = require('./Routes/userRouter.js')
require('dotenv').config();
const requestLogger = require('./middleware/requestLogger.js')
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0'; // This will allow connections from any IP

// Connect to MongoDB
connectDB();

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,  // This ensures session is not stored unless modified
  cookie: { maxAge: 60000 }
}));

// app.use(requestLogger)
// Add CORS middleware
app.use(cors);
//adding req timeout
app.use((req, res, next) => {
    // Set timeout to 5 seconds (5000ms)
    res.setTimeout(10000, () => {
      if (!res.headersSent) {
        res.status(504).send('Request timeout');
      }
    });
    next();
  });
// Routes import
const authRoutes = require('./Routes/authRouter');
const chatbotRoutes = require('./Routes/chatbot');
const profileRoutes = require('./Routes/profile');

// Routes use
app.options("/",()=>{
    return res.end("Hello from server")
})
app.use('/chatapp/api/v1/auth', authRoutes);
app.use('/chatapp/api/v1/user', userRouter);
app.use('/chatapp/api/v1/user', profileRoutes);
app.use('/chatapp/api/v1/chatbot', chatbotRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, host, () => {
    console.log(`Server is running on: - http://${host}:${port}`);
  
});