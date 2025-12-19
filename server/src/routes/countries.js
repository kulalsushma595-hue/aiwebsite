const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/countries - list countries (with basic pagination)
router.get('/', async (req, res) => {
  const { skip = 0, take = 20, q } = req.query;
  try {
    const where = q ? { where: { name: { contains: q, mode: 'insensitive' } } } : {};
    const countries = await prisma.country.findMany({ skip: Number(skip), take: Number(take), orderBy: { name: 'asc' }, ...where });
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// GET /api/countries/:slug - single country with destinations
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const country = await prisma.country.findUnique({ where: { slug }, include: { destinations: true } });
    if (!country) return res.status(404).json({ error: 'Country not found' });
    res.json(country);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch country' });
  }
});

module.exports = router;
