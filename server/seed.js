/* Basic seed script to create a few countries and destinations

Usage:
  1. Copy .env.example to .env and set DATABASE_URL
  2. Run: npx prisma migrate dev --name init
  3. Run: node seed.js
*/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.country.createMany({
    data: [
      { name: 'Maldives', slug: 'maldives', code: 'MDV', flagUrl: 'https://flagcdn.com/w320/mv.png' },
      { name: 'Switzerland', slug: 'switzerland', code: 'CHE', flagUrl: 'https://flagcdn.com/w320/ch.png' },
      { name: 'Japan', slug: 'japan', code: 'JPN', flagUrl: 'https://flagcdn.com/w320/jp.png' }
    ],
    skipDuplicates: true
  });

  const maldives = await prisma.country.findUnique({ where: { slug: 'maldives' } });
  const japan = await prisma.country.findUnique({ where: { slug: 'japan' } });
  const switzerland = await prisma.country.findUnique({ where: { slug: 'switzerland' } });

  await prisma.destination.createMany({
    data: [
      { name: 'Male', slug: 'male', description: 'Capital islands', countryId: maldives.id, photos: '' },
      { name: 'Atolls & Reefs', slug: 'maldives-atolls', description: 'Beautiful atolls for diving', countryId: maldives.id, photos: '' },
      { name: 'Tokyo', slug: 'tokyo', description: 'Vibrant capital', countryId: japan.id, photos: '' },
      { name: 'Zurich', slug: 'zurich', description: 'Swiss city surrounded by lakes and mountains', countryId: switzerland.id, photos: '' },
      { name: 'Interlaken', slug: 'interlaken', description: 'Gateway to the Alps', countryId: switzerland.id, photos: '' }
    ],
    skipDuplicates: true
  });

  const tokyo = await prisma.destination.findUnique({ where: { slug: 'tokyo' } });
  const male = await prisma.destination.findUnique({ where: { slug: 'male' } });
  const zurich = await prisma.destination.findUnique({ where: { slug: 'zurich' } });

  await prisma.itinerary.createMany({
    data: [
      { title: 'Tokyo in 4 days', description: 'Highlights of Tokyo with food and culture', durationDays: 4, destinationId: tokyo.id },
      { title: 'Maldives Relax', description: '7 days of beach and diving', durationDays: 7, destinationId: male.id },
      { title: 'Alps Essentials', description: '5 days visiting Interlaken and surrounding peaks', durationDays: 5, destinationId: zurich.id }
    ],
    skipDuplicates: true
  });

  // create an admin user if not exists (email: admin@wanderway.test / password: password)
  const adminEmail = 'admin@wanderway.test';
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const bcrypt = require('bcrypt');
    const hashed = await bcrypt.hash('password', 10);
    await prisma.user.create({ data: { email: adminEmail, password: hashed, name: 'Admin', role: 'admin' } });
    console.log('Admin user created: admin@wanderway.test / password');
  }

  console.log('Seed finished');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });