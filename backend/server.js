const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database server system endpoint listener driver hook binding
mongoose.connect('mongodb://localhost:27017/feedbackDB')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema layout blueprints configuration rules mapping template structure
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Endpoint Action API 1: POST path route to create and save items data models records
app.post('/addFeedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: 'Saved', data: newFeedback });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoint Action API 2: GET path route to query array elements files from collections logs
app.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoint Action API 3: DELETE path route to strip target single document trace matching specific mapping ID
app.delete('/feedback/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Port process deployment startup tracking line hooks interface configurations execution
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});