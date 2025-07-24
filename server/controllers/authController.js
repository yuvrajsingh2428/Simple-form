// server/controllers/authController.js
const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken';
//import User from '../models/User.js';
const User = require('../models/User.js'); // Adjust import if using CommonJS

const JWT_SECRET = process.env.JWT_SECRET;

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user || !(await user.compare(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, role: user.role });
}
module.exports = { login }; // Adjust export if using CommonJS