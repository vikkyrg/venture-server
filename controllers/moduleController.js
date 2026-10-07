const mongoose = require('mongoose');
const Module = require('../models/Module');
const Topic = require('../models/Topic');
const Course = require('../models/Course');

// @desc    Get modules for a course (supports course ObjectId or course slug)
// @route   GET /api/v1/modules/course/:courseId
const getModulesByCourse = async (req, res, next) => {
  try {
    const courseParam = req.params.courseId;
    let targetCourseId = courseParam;

    if (!mongoose.Types.ObjectId.isValid(courseParam)) {
      const course = await Course.findOne({ slug: courseParam });
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      targetCourseId = course._id;
    }

    const { status } = req.query;
    let query = { courseId: targetCourseId };
    if (status) {
      query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    }

    const modules = await Module.find(query).sort({ order: 1, createdAt: 1 });
    res.json({
      success: true,
      data: modules
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single module by ID
// @route   GET /api/v1/modules/:id
const getModuleById = async (req, res, next) => {
  try {
    const moduleItem = await Module.findById(req.params.id).populate('courseId', 'title slug');
    if (!moduleItem) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    const topics = await Topic.find({ moduleId: moduleItem._id }).sort({ order: 1 });

    res.json({
      success: true,
      data: {
        ...moduleItem.toObject(),
        topics
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create module
// @route   POST /api/v1/modules
const createModule = async (req, res, next) => {
  try {
    const { courseId, title, slug, description, order, status } = req.body;

    if (!courseId || !title || !slug) {
      return res.status(400).json({ success: false, message: 'courseId, title, and slug are required' });
    }

    // Ensure course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Referenced Course not found' });
    }

    const cleanSlug = slug.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

    const newModule = await Module.create({
      courseId,
      title,
      slug: cleanSlug,
      description: description || '',
      order: order !== undefined ? Number(order) : 1,
      status: status || 'published'
    });

    res.status(201).json({
      success: true,
      message: 'Module created successfully',
      data: newModule
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A module with this slug already exists for this course.' });
    }
    next(error);
  }
};

// @desc    Update module
// @route   PUT /api/v1/modules/:id
const updateModule = async (req, res, next) => {
  try {
    if (req.body.slug) {
      req.body.slug = req.body.slug.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
    }
    const moduleItem = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!moduleItem) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }
    res.json({
      success: true,
      message: 'Module updated successfully',
      data: moduleItem
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A module with this slug already exists for this course.' });
    }
    next(error);
  }
};

// @desc    Delete module
// @route   DELETE /api/v1/modules/:id
const deleteModule = async (req, res, next) => {
  try {
    const moduleItem = await Module.findById(req.params.id);
    if (!moduleItem) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    await Topic.deleteMany({ moduleId: moduleItem._id });
    await moduleItem.deleteOne();

    res.json({
      success: true,
      message: 'Module and associated topics deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getModulesByCourse,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
};
