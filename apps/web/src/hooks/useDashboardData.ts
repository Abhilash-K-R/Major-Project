import { useEffect, useState } from "react";
import type {
  Appointment,
  Doctor,
  QueueSummary,
  WaitTimePredictionResult
} from "@smart-hospital/shared";
import { apiClient } from "../api/client";

interface DashboardState {
  loading: boolean;
  error: string | null;
  health: { status: string; service: string; timestamp: string } | null;
  doctors: Doctor[];
  queueSummary: QueueSummary | null;
  appointments: Appointment[];
  prediction: WaitTimePredictionResult | null;
}

const initialState: DashboardState = {
  loading: true,
  error: null,
  health: null,
  doctors: [],
  queueSummary: null,
  appointments: [],
  prediction: null
};

export function useDashboardData() {
  const [state, setState] = useState<DashboardState>(initialState);

  useEffect(() => {
    async function load() {
      try {
        const [health, doctors, queueSummary, appointments, prediction] =
          await Promise.all([
            apiClient.getHealth(),
            apiClient.getDoctors(),
            apiClient.getQueueSummary(),
            apiClient.getTodayAppointments(),
            apiClient.getWaitPrediction()
          ]);

        setState({
          loading: false,
          error: null,
          health,
          doctors: doctors.data as Doctor[],
          queueSummary: queueSummary.data as QueueSummary,
          appointments: appointments.data as Appointment[],
          prediction: prediction.data as WaitTimePredictionResult
        });
      } catch (error) {
        setState({
          ...initialState,
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }

    load();
  }, []);

  return state;
}
