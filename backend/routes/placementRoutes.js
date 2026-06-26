const express = require('express');
const router = express.Router();
const { Placement, Instructor, School } = require('../models');

// Get all placements
router.get('/', async (req, res) => {
  try {
    const placements = await Placement.findAll({
      include: [Instructor, School]
    });
    res.json(placements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch placements' });
  }
});

// Get placement by ID
router.get('/:id', async (req, res) => {
  try {
    const placement = await Placement.findByPk(req.params.id, {
      include: [Instructor, School]
    });
    if (placement) {
      res.json(placement);
    } else {
      res.status(404).json({ error: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch placement' });
  }
});

// Create new placement
router.post('/', async (req, res) => {
  try {
    const placement = await Placement.create(req.body);
    const created = await Placement.findByPk(placement.id, {
      include: [Instructor, School]
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update placement
router.put('/:id', async (req, res) => {
  try {
    const placement = await Placement.findByPk(req.params.id);
    if (placement) {
      await placement.update(req.body);
      const updated = await Placement.findByPk(req.params.id, {
        include: [Instructor, School]
      });
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Placement not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete placement
router.delete('/:id', async (req, res) => {
  try {
    const placement = await Placement.findByPk(req.params.id);
    if (placement) {
      await placement.destroy();
      res.json({ message: 'Placement deleted successfully' });
    } else {
      res.status(404).json({ error: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete placement' });
  }
});

module.exports = router;