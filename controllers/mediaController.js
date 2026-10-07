const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

// @desc    Upload media file
// @route   POST /api/v1/media
const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl
    });

    res.status(201).json({
      success: true,
      message: 'Media uploaded successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all media files
// @route   GET /api/v1/media
const getMediaFiles = async (req, res, next) => {
  try {
    const mediaFiles = await Media.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: mediaFiles
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media file
// @route   DELETE /api/v1/media/:id
const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Remove file from disk if exists
    const filePath = path.join(__dirname, '../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.deleteOne();

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMedia,
  getMediaFiles,
  deleteMedia
};
