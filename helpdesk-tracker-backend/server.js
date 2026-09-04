const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const passport = require('./config/passport');
const googleAuthRoutes = require('./routes/googleAuthRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const rateLimit = require('express-rate-limit');

const app = express();
app.use(passport.initialize());
// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting for Auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { message: "Too many login attempts from this IP, please try again after 15 minutes" }
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/auth', googleAuthRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
