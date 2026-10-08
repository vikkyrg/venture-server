const mongoose = require('mongoose');
const { generateSlug } = require('../utils/slugify');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String },
  image: { type: String, default: '' },
  icon: { type: String, default: '' },
  duration: { type: String, default: '8 Weeks' },
  level: { type: String, default: 'All Levels' },
  deliveryMode: { 
    type: String, 
    enum: ["online", "offline", "online_offline"], 
    default: "online", 
    required: true 
  },
  handsOnProjects: {
    type: Boolean,
    default: true,
    required: true
  },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

courseSchema.pre('validate', function(next) {
  if (this.slug) {
    this.slug = generateSlug(this.slug);
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
