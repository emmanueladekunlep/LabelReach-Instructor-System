const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, testConnection } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const placementRoutes = require('./routes/placementRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/stats', statsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('LabelReach Backend is running! 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  
  // Test database connection
  await testConnection();
});