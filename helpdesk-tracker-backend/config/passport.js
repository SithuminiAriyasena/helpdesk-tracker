const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../config/db'); // optional if you need to look up user

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'missing_client_id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'missing_client_secret',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user in DB based on Google profile ID or email
    const email = profile.emails[0].value;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    let user;
    if (rows.length > 0) {
      user = rows[0];
    } else {
      // Create a new user with role "user"
      const [result] = await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [profile.displayName, email, '', 'user']);
      const [newUserRows] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      user = newUserRows[0];
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
