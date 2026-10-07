const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createEnquiry);
router.get('/', protect, getEnquiries);
router.get('/:id', protect, getEnquiryById);
router.put('/:id', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
