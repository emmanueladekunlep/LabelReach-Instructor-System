const express = require('express');
const router = express.Router();
const { Instructor } = require('../models');

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.findAll();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch instructors' });
  }
});

// Get instructor by ID
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      res.json(instructor);
    } else {
      res.status(404).json({ error: 'Instructor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch instructor' });
  }
});

// Create new instructor
router.post('/', async (req, res) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(201).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update instructor
router.put('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      await instructor.update(req.body);
      res.json(instructor);
    } else {
      res.status(404).json({ error: 'Instructor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete instructor
router.delete('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      await instructor.destroy();
      res.json({ message: 'Instructor deleted successfully' });
    } else {
      res.status(404).json({ error: 'Instructor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete instructor' });
  }
});

module.exports = router;