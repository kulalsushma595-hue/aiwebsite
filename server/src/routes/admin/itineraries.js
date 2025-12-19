const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/admin/itineraries
router.post('/', async (req, res) => {
  try {
    const { title, description, durationDays, destinationId } = req.body;
    const it = await prisma.itinerary.create({ data: { title, description, durationDays, destinationId } });
    res.json(it);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
});

// PUT /api/admin/itineraries/:id
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const it = await prisma.itinerary.update({ where: { id }, data });
    res.json(it);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update itinerary' });
  }
});

// DELETE /api/admin/itineraries/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.itinerary.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete itinerary' });
  }
});

module.exports = router;