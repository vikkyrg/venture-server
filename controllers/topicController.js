const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const Module = require('../models/Module');
const Course = require('../models/Course');

// @desc    Get topics for a module
// @route   GET /api/v1/topics/module/:moduleId
const getTopicsByModule = async (req, res, next) => {
  try {
    const moduleParam = req.params.moduleId;
    let targetModuleId = moduleParam;

    if (!mongoose.Types.ObjectId.isValid(moduleParam)) {
      const moduleItem = await Module.findOne({ slug: moduleParam });
      if (!moduleItem) {
        return res.status(404).json({ success: false, message: 'Module not found' });
      }
      targetModuleId = moduleItem._id;
    }

    const { status } = req.query;
    let query = { moduleId: targetModuleId };
    if (status) query.status = status;

    const topics = await Topic.find(query).sort({ order: 1 });
    res.json({
      success: true,
      data: topics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single topic by ID
// @route   GET /api/v1/topics/:id
const getTopicById = async (req, res, next) => {
  try {
    const topic = await Topic.findById(req.params.id).populate('courseId', 'title slug').populate('moduleId', 'title slug');
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }
    res.json({
      success: true,
      data: topic
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get topic dynamically by courseSlug, moduleSlug, topicSlug
// @route   GET /api/v1/topics/:courseSlug/:moduleSlug/:topicSlug
const getTopicBySlugs = async (req, res, next) => {
  try {
    const { courseSlug, moduleSlug, topicSlug } = req.params;

    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const moduleItem = await Module.findOne({ courseId: course._id, slug: moduleSlug });
    if (!moduleItem) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    const topic = await Topic.findOne({ moduleId: moduleItem._id, slug: topicSlug });
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    // Get prev & next topic in module
    const allTopics = await Topic.find({ moduleId: moduleItem._id, status: 'published' }).sort({ order: 1 });
    const currentIndex = allTopics.findIndex(t => t._id.toString() === topic._id.toString());
    
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

    res.json({
      success: true,
      data: {
        topic,
        course: { title: course.title, slug: course.slug },
        module: { title: moduleItem.title, slug: moduleItem.slug },
        navigation: {
          prev: prevTopic ? { title: prevTopic.title, slug: prevTopic.slug } : null,
          next: nextTopic ? { title: nextTopic.title, slug: nextTopic.slug } : null
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create topic
// @route   POST /api/v1/topics
const createTopic = async (req, res, next) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      data: topic
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update topic
// @route   PUT /api/v1/topics/:id
const updateTopic = async (req, res, next) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }
    res.json({
      success: true,
      message: 'Topic updated successfully',
      data: topic
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete topic
// @route   DELETE /api/v1/topics/:id
const deleteTopic = async (req, res, next) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }
    await topic.deleteOne();
    res.json({
      success: true,
      message: 'Topic deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTopicsByModule,
  getTopicById,
  getTopicBySlugs,
  createTopic,
  updateTopic,
  deleteTopic
};
