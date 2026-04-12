import type {
  Appointment,
  Doctor,
  QueueSummary,
  WaitTimePredictionInput,
  WaitTimePredictionResult
} from "@smart-hospital/shared";

export const doctors: Doctor[] = [
  {
    id: "doc-001",
    name: "Dr. Priya Nair",
    specialty: "Cardiology",
    averageConsultationMinutes: 18,
    roomNumber: "B-204",
    isAvailable: true
  },
  {
    id: "doc-002",
    name: "Dr. Arjun Mehta",
    specialty: "Orthopedics",
    averageConsultationMinutes: 22,
    roomNumber: "A-112",
    isAvailable: true
  },
  {
    id: "doc-003",
    name: "Dr. Farah Khan",
    specialty: "Neurology",
    averageConsultationMinutes: 30,
    roomNumber: "C-310",
    isAvailable: false
  }
];

export const appointments: Appointment[] = [
  {
    id: "apt-1001",
    patientId: "pat-001",
    patientName: "Riya Sharma",
    doctorId: "doc-001",
    doctorName: "Dr. Priya Nair",
    scheduledTime: "2026-04-12T09:00:00.000Z",
    status: "IN_CONSULTATION",
    queuePosition: 0
  },
  {
    id: "apt-1002",
    patientId: "pat-002",
    patientName: "Aman Verma",
    doctorId: "doc-001",
    doctorName: "Dr. Priya Nair",
    scheduledTime: "2026-04-12T09:20:00.000Z",
    status: "WAITING",
    queuePosition: 1
  },
  {
    id: "apt-1003",
    patientId: "pat-003",
    patientName: "Neha Rao",
    doctorId: "doc-001",
    doctorName: "Dr. Priya Nair",
    scheduledTime: "2026-04-12T09:40:00.000Z",
    status: "WAITING",
    queuePosition: 2
  },
  {
    id: "apt-1004",
    patientId: "pat-004",
    patientName: "Karan Das",
    doctorId: "doc-002",
    doctorName: "Dr. Arjun Mehta",
    scheduledTime: "2026-04-12T10:00:00.000Z",
    status: "WAITING",
    queuePosition: 1
  }
];

export const queueSummary: QueueSummary = {
  activeDoctors: 2,
  patientsWaiting: 3,
  patientsInConsultation: 1,
  averageWaitMinutes: 27,
  lastUpdatedAt: "2026-04-12T09:12:00.000Z"
};

export function buildPrediction(
  input: WaitTimePredictionInput
): WaitTimePredictionResult {
  const doctor = doctors.find((item) => item.id === input.doctorId);
  const appointment = appointments.find((item) => item.id === input.appointmentId);

  const averageConsultationMinutes = doctor?.averageConsultationMinutes ?? 20;
  const queuePosition = appointment?.queuePosition ?? 1;
  const activeDelayMultiplier = queuePosition > 1 ? 1.1 : 1;
  const predictedWaitMinutes = Math.round(
    averageConsultationMinutes * queuePosition * activeDelayMultiplier
  );
  const recommendedLeaveInMinutes = Math.max(
    predictedWaitMinutes - input.travelMinutes,
    0
  );

  return {
    appointmentId: input.appointmentId,
    patientId: input.patientId,
    doctorId: input.doctorId,
    predictedWaitMinutes,
    recommendedLeaveInMinutes,
    queuePosition,
    confidence: predictedWaitMinutes > 40 ? "medium" : "high",
    factors: {
      averageConsultationMinutes,
      travelMinutes: input.travelMinutes,
      activeDelayMultiplier
    }
  };
}
