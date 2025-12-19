const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/admin/destinations
router.post('/', async (req, res) => {
  try {
    const { name, slug, description, countryId, photos } = req.body;
    const destination = await prisma.destination.create({ data: { name, slug, description, countryId, photos } });
    res.json(destination);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create destination' });
  }
});

// PUT /api/admin/destinations/:id
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const dest = await prisma.destination.update({ where: { id }, data });
    res.json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update destination' });
  }
});

// DELETE /api/admin/destinations/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.destination.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete destination' });
  }
});

module.exports = router;