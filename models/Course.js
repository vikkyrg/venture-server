const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String },
  image: { type: String, default: '' },
  icon: { type: String, default: '' },
  duration: { type: String, default: '8 Weeks' },
  level: { type: String, default: 'All Levels' },
  mode: { type: String, default: 'Classroom / Live Online' },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
