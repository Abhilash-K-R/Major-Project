import { z } from "zod";
import type { FastifyInstance } from "fastify";
import { listDoctors } from "../modules/doctors/doctors.service.js";
import { listTodayAppointments } from "../modules/appointments/appointments.service.js";
import { getQueueSummary } from "../modules/queue/queue.service.js";
import { predictWaitTime } from "../modules/predictions/predictions.service.js";

const waitTimeRequestSchema = z.object({
  appointmentId: z.string(),
  patientId: z.string(),
  doctorId: z.string(),
  travelMinutes: z.coerce.number().min(0)
});

export async function registerRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({
    status: "ok",
    service: "smart-hospital-api",
    timestamp: new Date().toISOString()
  }));

  app.get("/doctors", async () => ({
    data: listDoctors()
  }));

  app.get("/appointments/today", async () => ({
    data: listTodayAppointments()
  }));

  app.get("/queue/summary", async () => ({
    data: getQueueSummary()
  }));

  app.post("/predictions/wait-time", async (request, reply) => {
    const parsed = waitTimeRequestSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        error: "VALIDATION_ERROR",
        details: parsed.error.flatten()
      });
    }

    return {
      data: predictWaitTime(parsed.data)
    };
  });
}
