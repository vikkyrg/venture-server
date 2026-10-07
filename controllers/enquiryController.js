const Enquiry = require('../models/Enquiry');

// @desc    Create new enquiry
// @route   POST /api/v1/enquiries
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, course, qualification, experience, preferredMode, message } = req.body;

    if (!name || !email || !phone || !course) {
      return res.status(400).json({ success: false, message: 'Please provide required fields: Name, Email, Phone, Course' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      course,
      qualification,
      experience,
      preferredMode,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our team will contact you soon.',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/v1/enquiries
const getEnquiries = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enquiry by ID
// @route   GET /api/v1/enquiries/:id
const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/v1/enquiries/:id
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/v1/enquiries/:id
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    await enquiry.deleteOne();
    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
};
