import { MetricCard } from "../components/MetricCard";
import { useDashboardData } from "../hooks/useDashboardData";

export function DashboardPage() {
  const { loading, error, health, doctors, queueSummary, appointments, prediction } =
    useDashboardData();

  if (loading) {
    return <div className="panel">Loading live hospital operations snapshot...</div>;
  }

  if (error) {
    return <div className="panel error-state">Unable to load dashboard: {error}</div>;
  }

  return (
    <div className="page-grid">
      <section className="hero panel">
        <div>
          <p className="eyebrow">Live Queue Intelligence</p>
          <h2>Operational command view for patient flow and arrival timing.</h2>
        </div>
        <div className="hero-status">
          <span className="status-pill">API {health?.status}</span>
          <span className="status-subtle">{health?.timestamp}</span>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard
          label="Active Doctors"
          value={queueSummary?.activeDoctors ?? 0}
          helper="Clinicians currently participating in live queue tracking"
        />
        <MetricCard
          label="Patients Waiting"
          value={queueSummary?.patientsWaiting ?? 0}
          helper="Real-time queue backlog across tracked specialties"
        />
        <MetricCard
          label="Average Wait"
          value={`${queueSummary?.averageWaitMinutes ?? 0} min`}
          helper="Dynamic estimate from queue progression"
        />
        <MetricCard
          label="Leave Recommendation"
          value={`${prediction?.recommendedLeaveInMinutes ?? 0} min`}
          helper="Sample patient guidance based on wait and travel time"
        />
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Doctor Availability</h3>
          <p>Foundation endpoint for admin management and clinic operations.</p>
        </div>
        <div className="table-list">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="table-row">
              <div>
                <strong>{doctor.name}</strong>
                <span>{doctor.specialty}</span>
              </div>
              <div>
                <strong>{doctor.averageConsultationMinutes} min</strong>
                <span>{doctor.roomNumber}</span>
              </div>
              <span className={doctor.isAvailable ? "status-available" : "status-busy"}>
                {doctor.isAvailable ? "Available" : "Offline"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Today&apos;s Queue</h3>
          <p>Starter appointment feed for queue monitoring and prediction updates.</p>
        </div>
        <div className="table-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="table-row">
              <div>
                <strong>{appointment.patientName}</strong>
                <span>{appointment.doctorName}</span>
              </div>
              <div>
                <strong>{appointment.status}</strong>
                <span>Queue #{appointment.queuePosition}</span>
              </div>
              <span>{new Date(appointment.scheduledTime).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel prediction-panel">
        <div className="section-heading">
          <h3>AI Prediction Snapshot</h3>
          <p>Current heuristic model that can later be upgraded to ML-backed scoring.</p>
        </div>
        <div className="prediction-grid">
          <div>
            <span>Predicted Wait</span>
            <strong>{prediction?.predictedWaitMinutes} min</strong>
          </div>
          <div>
            <span>Queue Position</span>
            <strong>{prediction?.queuePosition}</strong>
          </div>
          <div>
            <span>Confidence</span>
            <strong>{prediction?.confidence}</strong>
          </div>
          <div>
            <span>Travel Buffer</span>
            <strong>{prediction?.factors.travelMinutes} min</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
