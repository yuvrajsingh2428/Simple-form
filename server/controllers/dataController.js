// server/controllers/dataController.js
//import Entry from '../models/Entry.js';
const Entry = require('../models/Entry.js'); // Adjust import if using CommonJS
//import { Parser } from 'json2csv';
const Parser = require('json2csv').Parser;

async function submitEntry(req, res) {
  const e = new Entry({ ...req.body });
  await e.save();
  res.json({ message: 'Saved' });
}

async function listEntries(req, res) {
  // only Super-Admin
  const entries = await Entry.find();
  res.json(entries);
}

async function downloadCSV(req, res) {
  const entries = await Entry.find().lean();
  const parser = new Parser();
  const csv = parser.parse(entries);
  res.header('Content-Type','text/csv');
  res.attachment('entries.csv').send(csv);
}

module.exports = { submitEntry, listEntries, downloadCSV }; // Adjust export if using CommonJS
