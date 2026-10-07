const Settings = require('../models/Settings');

// @desc    Get site settings
// @route   GET /api/v1/settings
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/v1/settings
const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings
};
