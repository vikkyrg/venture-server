const mongoose = require('mongoose');
const { generateSlug } = require('../utils/slugify');

const topicSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  content: { type: String, default: '' },
  learningObjectives: [{ type: String }],
  subTopics: [{ type: String }],
  images: [{ type: String }],
  videos: [{ type: String }],
  resources: [{ type: String }],
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

topicSchema.index({ moduleId: 1, slug: 1 }, { unique: true });

topicSchema.pre('validate', function(next) {
  if (this.slug) {
    this.slug = generateSlug(this.slug);
  }
  next();
});

module.exports = mongoose.model('Topic', topicSchema);
