const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getCourses);
router.get('/:slug', getCourseBySlug);
router.post('/', protect, createCourse);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);

module.exports = router;
