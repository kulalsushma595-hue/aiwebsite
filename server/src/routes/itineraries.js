const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/itineraries - list itineraries, optional destinationId
router.get('/', async (req, res) => {
  const { skip = 0, take = 20, destinationId } = req.query;
  try {
    const where = {};
    if (destinationId) where.destinationId = Number(destinationId);
    const items = await prisma.itinerary.findMany({ where, skip: Number(skip), take: Number(take), orderBy: { id: 'desc' } });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch itineraries' });
  }
});

// GET /api/itineraries/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const itinerary = await prisma.itinerary.findUnique({ where: { id: Number(id) }, include: { destination: true } });
    if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
    res.json(itinerary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch itinerary' });
  }
});

module.exports = router;