const express = require('express');
const router = express.Router();
const {
  getModulesByCourse,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
} = require('../controllers/moduleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/course/:courseId', getModulesByCourse);
router.get('/:id', getModuleById);
router.post('/', protect, createModule);
router.put('/:id', protect, updateModule);
router.delete('/:id', protect, deleteModule);

module.exports = router;
