const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/admin/countries - create
router.post('/', async (req, res) => {
  try {
    const { name, slug, code, flagUrl } = req.body;
    const country = await prisma.country.create({ data: { name, slug, code, flagUrl } });
    res.json(country);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create country' });
  }
});

// PUT /api/admin/countries/:id - update
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const country = await prisma.country.update({ where: { id }, data });
    res.json(country);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update country' });
  }
});

// DELETE /api/admin/countries/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.country.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete country' });
  }
});

module.exports = router;