// server/routes/data.js
const express = require('express');
const { submitEntry, listEntries, downloadCSV } = require('../controllers/dataController.js');
const { adminOnly } = require('../middleware/adminOnly.js');

const router = express.Router();
router.post('/', submitEntry); // Public form submission
router.get('/', adminOnly, listEntries); // Admin only
router.get('/export', adminOnly, downloadCSV); // Admin only

module.exports = router;
