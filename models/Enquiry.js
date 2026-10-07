const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  qualification: { type: String, default: '' },
  experience: { type: String, default: '' },
  preferredMode: { type: String, default: 'Live Online' },
  message: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'], 
    default: 'New' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
