const mongoose = require('mongoose');

// creating schema for storing the details
const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
    // type: Date,
    // required: true,
    // default: Date.now
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
