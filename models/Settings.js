const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'Venture Soft' },
  logoUrl: { type: String, default: '/src/assets/logo.png' },
  email: { type: String, default: 'info@venturesoft.com' },
  phone: { type: String, default: '+91 98765 43210' },
  address: { type: String, default: 'Tech Hub Park, Suite 402, Bangalore, India' },
  socialLinks: {
    linkedin: { type: String, default: 'https://linkedin.com' },
    youtube: { type: String, default: 'https://youtube.com' },
    twitter: { type: String, default: 'https://twitter.com' },
    github: { type: String, default: 'https://github.com' }
  },
  footerContent: { type: String, default: 'Empowering future technology leaders with practical, industry-aligned IT training.' },
  contactInfo: { type: String, default: 'Reach out to our academic counselors today.' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
