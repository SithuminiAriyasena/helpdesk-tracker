// routes/googleAuthRoutes.js
const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Initiate Google OAuth login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, issue JWT
  const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET || 'your_jwt_secret_key_here', { expiresIn: '1d' });
  // Redirect to frontend with token as query param
  const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/google-callback?token=${token}`;
  res.redirect(redirectUrl);
});

module.exports = router;
