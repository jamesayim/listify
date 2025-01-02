const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db/connection");
require("dotenv").config();

// Secret key for JWT 
const JWT_SECRET = process.env.JWT_SECRET;

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if username or email exists
      const [results] = await db.promise().query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email]
      );
      if (results.length > 0) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user
      await db.promise().query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Login route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const [results] = await db.promise().query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
  
      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const user = results[0];
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;