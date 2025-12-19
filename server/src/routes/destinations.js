const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/destinations - list destinations with optional country filtering
router.get('/', async (req, res) => {
  const { skip = 0, take = 20, q, countrySlug } = req.query;
  try {
    const where = {};
    if (q) where.name = { contains: q, mode: 'insensitive' };
    if (countrySlug) {
      const country = await prisma.country.findUnique({ where: { slug: countrySlug } });
      if (!country) return res.status(404).json({ error: 'Country not found' });
      where.countryId = country.id;
    }
    const destinations = await prisma.destination.findMany({ where, skip: Number(skip), take: Number(take), orderBy: { name: 'asc' } });
    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

// GET /api/destinations/:slug - get destination with country and itineraries
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const destination = await prisma.destination.findUnique({ where: { slug }, include: { country: true } });
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    const itineraries = await prisma.itinerary.findMany({ where: { destinationId: destination.id } });
    res.json({ ...destination, itineraries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
});

module.exports = router;