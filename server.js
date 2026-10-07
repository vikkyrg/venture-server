require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Venture Soft Server running on port ${PORT}`);
});
