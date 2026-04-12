export type AppointmentStatus =
  | "BOOKED"
  | "CHECKED_IN"
  | "WAITING"
  | "IN_CONSULTATION"
  | "COMPLETED"
  | "CANCELLED";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  averageConsultationMinutes: number;
  roomNumber: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  scheduledTime: string;
  status: AppointmentStatus;
  queuePosition: number;
}

export interface QueueSummary {
  activeDoctors: number;
  patientsWaiting: number;
  patientsInConsultation: number;
  averageWaitMinutes: number;
  lastUpdatedAt: string;
}

export interface WaitTimePredictionInput {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  travelMinutes: number;
}

export interface WaitTimePredictionResult {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  predictedWaitMinutes: number;
  recommendedLeaveInMinutes: number;
  queuePosition: number;
  confidence: "low" | "medium" | "high";
  factors: {
    averageConsultationMinutes: number;
    travelMinutes: number;
    activeDelayMultiplier: number;
  };
}
