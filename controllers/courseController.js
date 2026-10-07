const Course = require('../models/Course');
const Module = require('../models/Module');
const Topic = require('../models/Topic');

// @desc    Get all courses (Public supports filtering published)
// @route   GET /api/v1/courses
const getCourses = async (req, res, next) => {
  try {
    const { status, featured } = req.query;
    let query = {};

    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === 'true';

    const courses = await Course.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course by slug (with modules and topics populated)
// @route   GET /api/v1/courses/:slug
const getCourseBySlug = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Query ALL published modules for this course with case-insensitive status matching
    const modules = await Module.find({
      courseId: course._id,
      status: { $regex: /^published$/i }
    }).sort({ order: 1, createdAt: 1 });
    
    // Get topics for each module
    const moduleIds = modules.map(m => m._id);
    const topics = await Topic.find({
      moduleId: { $in: moduleIds },
      status: { $regex: /^published$/i }
    }).sort({ order: 1, createdAt: 1 });

    const modulesWithTopics = modules.map(m => {
      const moduleTopics = topics.filter(t => t.moduleId.toString() === m._id.toString());
      return {
        ...m.toObject(),
        topics: moduleTopics
      };
    });

    res.json({
      success: true,
      data: {
        ...course.toObject(),
        modules: modulesWithTopics
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create course
// @route   POST /api/v1/courses
const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/v1/courses/:id
const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Cascade delete modules and topics
    const modules = await Module.find({ courseId: course._id });
    const moduleIds = modules.map(m => m._id);

    await Topic.deleteMany({ moduleId: { $in: moduleIds } });
    await Module.deleteMany({ courseId: course._id });
    await course.deleteOne();

    res.json({
      success: true,
      message: 'Course and related content deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
};
