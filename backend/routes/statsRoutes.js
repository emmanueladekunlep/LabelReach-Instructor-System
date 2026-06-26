const express = require('express');
const router = express.Router();
const { Instructor, School, Placement } = require('../models');

router.get('/', async (req, res) => {
  try {
    const totalInstructors = await Instructor.count();
    const totalSchools = await School.count();
    const activePlacements = await Placement.count({
      where: { status: 'active' }
    });
    const pendingRequests = 3; // Placeholder for demo

    res.json({
      totalInstructors,
      totalSchools,
      activePlacements,
      pendingRequests
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;