# API Design

## Versioning

Base path: `/api/v1`

## Initial Endpoints

- `GET /health`
- `GET /doctors`
- `GET /appointments/today`
- `GET /queue/summary`
- `POST /predictions/wait-time`

## Domain Principles

- JSON-only APIs
- Predictable resource naming
- Stateless authentication layer
- Validation-first request handling

## Sample Wait-Time Request

```json
{
  "appointmentId": "apt-1002",
  "patientId": "pat-002",
  "doctorId": "doc-001",
  "travelMinutes": 24
}
```

## Sample Wait-Time Response

```json
{
  "predictedWaitMinutes": 42,
  "recommendedLeaveInMinutes": 18,
  "confidence": "medium",
  "queuePosition": 3
}
```
