const Course = require('../models/Course');
const Module = require('../models/Module');
const Topic = require('../models/Topic');
const Enquiry = require('../models/Enquiry');

// @desc    Get dashboard metrics
// @route   GET /api/v1/stats/dashboard
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalCourses,
      publishedCourses,
      totalModules,
      publishedModules,
      totalTopics,
      publishedTopics,
      totalEnquiries,
      pendingEnquiries
    ] = await Promise.all([
      Course.countDocuments(),
      Course.countDocuments({ status: 'published' }),
      Module.countDocuments(),
      Module.countDocuments({ status: 'published' }),
      Topic.countDocuments(),
      Topic.countDocuments({ status: 'published' }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' })
    ]);

    res.json({
      success: true,
      data: {
        totalCourses,
        publishedCourses,
        totalModules,
        publishedModules,
        totalTopics,
        publishedTopics,
        totalEnquiries,
        pendingEnquiries
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
