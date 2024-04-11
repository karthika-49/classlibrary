const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  faculty: { type: String },
});



const Subject = mongoose.model('subjects', subjectSchema);

module.exports = Subject;
