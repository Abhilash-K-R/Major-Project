# AI-Based Smart Hospital Queue Prediction & Patient Arrival Optimization System

Production-style monorepo foundation for a smart hospital queue platform that helps patients arrive close to their consultation time using real-time queue tracking, dynamic waiting-time prediction, and travel-time aware notifications.

## Stack Choice

- Frontend: React + TypeScript + Vite + React Router
- Backend: Fastify + TypeScript + Zod
- Shared contracts: workspace package for domain types and API models
- Database: PostgreSQL with Prisma schema
- Realtime path: polling-ready API now, WebSocket-ready backend structure
- Deployment direction: Dockerized local services, environment-first configuration

## Workspace Layout

```text
apps/
  api/        Fastify API, queue prediction services, Prisma schema
  web/        React dashboard and patient/admin UI shell
packages/
  shared/     Shared TypeScript models and API contracts
docs/         Architecture, API design, database, roadmap
infra/        Local infrastructure assets
```

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment files:

   ```bash
   copy .env.example .env
   copy apps\api\.env.example apps\api\.env
   copy apps\web\.env.example apps\web\.env
   ```

3. Start local infrastructure:

   ```bash
   docker compose -f infra/docker-compose.yml up -d
   ```

4. Generate Prisma client and run the API + web app:

   ```bash
   npm run dev
   ```

## First Working Scope

- Health and readiness API
- Doctor list endpoint
- Queue summary endpoint
- Today appointments endpoint
- Wait-time prediction endpoint
- Frontend dashboard shell consuming those APIs

## Next Milestones

- Authentication and role-based access control
- Appointment booking and rescheduling flow
- WebSocket queue updates and push notifications
- Historical analytics and model calibration pipeline
- CI/CD, test coverage, and observability

See [docs/architecture.md](docs/architecture.md) and [docs/roadmap.md](docs/roadmap.md) for more detail.
