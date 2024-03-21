// task.js

// 1. Require Mongoose
const mongoose = require('mongoose');

// 2. Create Schema
const Schema = mongoose.Schema;

// 3. Add Properties
const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String
});

// 4. Export Model
module.exports = mongoose.model('Task', taskSchema);
