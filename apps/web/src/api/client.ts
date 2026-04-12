const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  getHealth() {
    return request<{ status: string; service: string; timestamp: string }>("/health");
  },
  getDoctors() {
    return request<{ data: unknown[] }>("/doctors");
  },
  getQueueSummary() {
    return request<{ data: unknown }>("/queue/summary");
  },
  getTodayAppointments() {
    return request<{ data: unknown[] }>("/appointments/today");
  },
  getWaitPrediction() {
    return request<{ data: unknown }>("/predictions/wait-time", {
      method: "POST",
      body: JSON.stringify({
        appointmentId: "apt-1002",
        patientId: "pat-002",
        doctorId: "doc-001",
        travelMinutes: 24
      })
    });
  }
};
