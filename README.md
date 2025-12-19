# WanderWay — Travel website (full-stack starter)

This workspace contains two main parts:

- `server/` — Node.js + Express + Prisma backend (Postgres)
- `client/` — Vite + React frontend

Quick setup (local dev):

1. Server
   - Open `server/`, copy `.env.example` to `.env`, set `DATABASE_URL` and `JWT_SECRET`.
   - Install and run:
     ```bash
     cd server
     npm install
     npx prisma migrate dev --name init
     npx prisma generate
     npm run seed
     npm run dev
     ```
2. Client
   - Open `client/` and run:
     ```bash
     cd client
     npm install
     npm run dev
     ```

Notes:
- The server uses Prisma with a Postgres datasource. For quick testing you can use a local Postgres (Docker) or a hosted DB.
- The client assumes the API is reachable at the same origin (`/api`). Configure a proxy in Vite or set `VITE_API_URL` for a different host.

Next steps I can take:
- Implement admin panel and protected routes
- Add image uploads (Cloudinary)
- Add full search and country/destination pages
- Set up tests and CI

Tell me which task to do next or if you want me to continue implementing the backend API and seeds (auth + admin endpoints).