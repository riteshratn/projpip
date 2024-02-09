// models/taskSchema.js
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  project: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
});

module.exports = mongoose.model('Task', taskSchema);
