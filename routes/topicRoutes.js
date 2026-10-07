const express = require('express');
const router = express.Router();
const {
  getTopicsByModule,
  getTopicById,
  getTopicBySlugs,
  createTopic,
  updateTopic,
  deleteTopic
} = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');

router.get('/module/:moduleId', getTopicsByModule);
router.get('/:id', getTopicById);
router.get('/:courseSlug/:moduleSlug/:topicSlug', getTopicBySlugs);
router.post('/', protect, createTopic);
router.put('/:id', protect, updateTopic);
router.delete('/:id', protect, deleteTopic);

module.exports = router;
