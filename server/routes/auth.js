// server/routes/auth.js
//import express from 'express';
//const require = require('express');
const express = require('express');
//import { login } from '../controllers/authController.js';
const login = require('../controllers/authController.js').login; // Adjust import if using CommonJS
const router = express.Router();
router.post('/login', login);
module.exports = router;


