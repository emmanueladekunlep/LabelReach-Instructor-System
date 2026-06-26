const express = require('express');
const router = express.Router();
const { School } = require('../models');

// Get all schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.findAll();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
});

// Get school by ID
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (school) {
      res.json(school);
    } else {
      res.status(404).json({ error: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch school' });
  }
});

// Create new school
router.post('/', async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update school
router.put('/:id', async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (school) {
      await school.update(req.body);
      res.json(school);
    } else {
      res.status(404).json({ error: 'School not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete school
router.delete('/:id', async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (school) {
      await school.destroy();
      res.json({ message: 'School deleted successfully' });
    } else {
      res.status(404).json({ error: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete school' });
  }
});

module.exports = router;