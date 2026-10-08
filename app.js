const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const topicRoutes = require('./routes/topicRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// Enable CORS with CLIENT_URL & ADMIN_URL fallback support
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  process.env.ADMIN_URL || 'http://localhost:3001'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow during local development
    }
  },
  credentials: true
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'Venture Soft API is active and healthy.' });
});

// API v1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/topics', topicRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/stats', statsRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
