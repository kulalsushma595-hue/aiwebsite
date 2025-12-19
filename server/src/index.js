require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Basic health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Routes
const countriesRouter = require('./routes/countries');
const authRouter = require('./routes/auth');
const destinationsRouter = require('./routes/destinations');
const itinerariesRouter = require('./routes/itineraries');
const { authMiddleware, adminOnly } = require('./middleware/auth');
const adminCountries = require('./routes/admin/countries');
const adminDestinations = require('./routes/admin/destinations');
const adminItineraries = require('./routes/admin/itineraries');

app.use('/api/countries', countriesRouter);
app.use('/api/destinations', destinationsRouter);
app.use('/api/itineraries', itinerariesRouter);
app.use('/api/auth', authRouter);

// Admin routes (protected)
app.use('/api/admin/countries', authMiddleware, adminOnly, adminCountries);
app.use('/api/admin/destinations', authMiddleware, adminOnly, adminDestinations);
app.use('/api/admin/itineraries', authMiddleware, adminOnly, adminItineraries);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
