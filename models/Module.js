const mongoose = require('mongoose');
const { generateSlug } = require('../utils/slugify');

const moduleSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

moduleSchema.index({ courseId: 1, slug: 1 }, { unique: true });

moduleSchema.pre('validate', function(next) {
  if (this.slug) {
    this.slug = generateSlug(this.slug);
  }
  next();
});

module.exports = mongoose.model('Module', moduleSchema);
