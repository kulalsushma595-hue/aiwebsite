# WanderWay — Server

Backend for the WanderWay travel site.

Tech: Node.js + Express + Prisma (Postgres)

Quick start:
1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Migrate DB and generate client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. Seed data:
   ```bash
   npm run seed
   ```
5. Start server:
   ```bash
   npm run dev
   ```

API endpoints:
- `GET /api/health`
- `GET /api/countries` — list
- `GET /api/countries/:slug` — single country with destinations
- `GET /api/destinations` — list destinations
- `GET /api/destinations/:slug` — destination with itineraries
- `GET /api/itineraries` — list itineraries
- `GET /api/itineraries/:id` — itinerary details
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login

Admin (protected with JWT + role=admin):
- `POST /api/admin/countries` — create country
- `PUT /api/admin/countries/:id` — update
- `DELETE /api/admin/countries/:id` — delete
- `POST /api/admin/destinations` — create destination
- `PUT /api/admin/destinations/:id` — update
- `DELETE /api/admin/destinations/:id` — delete
- `POST /api/admin/itineraries` — create itinerary
- `PUT /api/admin/itineraries/:id` — update
- `DELETE /api/admin/itineraries/:id` — delete

Note: An admin user is created by the seed script: `admin@wanderway.test` / `password`.

Notes:
- This is a minimal starting point. Add uploads (Cloudinary/S3), admin routes, search, and pagination as needed.