const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/admin/uploads - upload an image; optional destinationId to attach
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'wanderway' }, (error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        stream.end(buffer);
      });
    };

    const result = await streamUpload(req.file.buffer);
    const url = result.secure_url;

    // Optionally attach to a destination
    if (req.body.destinationId) {
      const destinationId = Number(req.body.destinationId);
      const dest = await prisma.destination.findUnique({ where: { id: destinationId } });
      if (!dest) return res.status(404).json({ error: 'Destination not found' });
      let photos = [];
      if (dest.photos) {
        try { photos = JSON.parse(dest.photos); } catch (e) { photos = dest.photos.split(',').filter(Boolean); }
      }
      photos.push(url);
      await prisma.destination.update({ where: { id: destinationId }, data: { photos: JSON.stringify(photos) } });
    }

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;