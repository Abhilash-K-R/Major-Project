# Database Design

## Core Entities

- `patients`
- `admins`
- `doctors`
- `appointments`
- `queue_events`
- `prediction_snapshots`
- `notifications`

## Relationship Summary

- A patient has many appointments.
- A doctor has many appointments.
- An appointment produces many queue events over time.
- Prediction snapshots store how wait-time estimates changed during the appointment lifecycle.

## Storage Notes

- PostgreSQL is the source of truth for transactional data.
- Queue history should be append-only where possible.
- Prediction snapshots make it possible to audit and improve the algorithm.
