const express = require('express');
const router = express.Router();
const { uploadMedia, getMediaFiles, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('file'), uploadMedia);
router.get('/', getMediaFiles);
router.delete('/:id', protect, deleteMedia);

module.exports = router;
