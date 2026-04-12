# Architecture Overview

## System Goals

- Predict patient waiting time with queue-aware logic.
- Help patients leave home at the right time using travel-time estimates.
- Give hospital staff real-time visibility into queue progression and delays.
- Keep the platform modular enough for future AI model upgrades and multi-hospital scaling.

## High-Level Design

```text
React Web App
    |
    v
Fastify API Gateway / Application Server
    |
    +-- Auth Module
    +-- Appointment Module
    +-- Queue Module
    +-- Prediction Module
    +-- Notification Module
    |
    +-- PostgreSQL
    +-- Redis (future)
    +-- External Maps / Notification Providers (future)
```

## Monorepo Strategy

- `apps/web`: patient and admin-facing frontend.
- `apps/api`: backend services, data access, AI prediction orchestration.
- `packages/shared`: contracts, DTOs, enums, and reusable types.

This structure keeps frontend/backend separation while allowing type-safe contracts and easier shared tooling.

## Backend Module Boundaries

- `modules/auth`: registration, login, JWT/session strategy.
- `modules/doctors`: doctor management and schedule metadata.
- `modules/appointments`: booking, lifecycle, and status transitions.
- `modules/queue`: real-time ordering, progress, and queue snapshots.
- `modules/predictions`: consultation averages and dynamic waiting estimates.
- `modules/notifications`: leave-now / leave-soon recommendations.

## Prediction Strategy

Version 1 uses a transparent heuristic model:

- Average consultation duration per doctor.
- Active queue size ahead of the patient.
- Delay multiplier from currently observed consultation pace.
- Travel time buffer.

Future versions can replace the heuristic with a trained model without changing the API contract.

## Realtime Strategy

Initial implementation uses polling-friendly endpoints.

Planned upgrade path:

- Fastify WebSocket/SSE for queue updates.
- Background workers for notifications and recalibration.
- Redis pub/sub for horizontal scaling.

## Security and Compliance Direction

- Role separation for patient, admin, and staff.
- Input validation with Zod.
- Environment-driven secrets.
- Audit logging and PHI-safe handling should be enforced before production use.
