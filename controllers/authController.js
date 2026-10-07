const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'venture_soft_secret_key_2026', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @desc    Auth admin & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token: generateToken(admin._id)
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin, getMe };
