export function severityLabel(score) {
  if (score >= 85) return "Critical";
  if (score >= 60) return "High";
  return "Stable";
}

export function severityClass(score) {
  if (score >= 85) return "critical";
  if (score >= 60) return "high";
  return "stable";
}

export function findBestHospital(hospitals) {
  return [...hospitals]
    .filter((hospital) => hospital.beds > 0)
    .sort((a, b) => a.distance - b.distance)[0];
}

export function calculateEta(call, hospital, trafficLights) {
  const highTraffic = trafficLights.filter((light) => light.congestion === "High").length;
  const urgencyDiscount = Math.floor(call.severity / 25);
  return Math.max(5, Math.round(hospital.distance * 4 + highTraffic * 1.7 - urgencyDiscount));
}

export function pickNearestAvailableAmbulance(ambulances, call) {
  return [...ambulances]
    .filter((unit) => unit.status === "Available")
    .sort((a, b) => {
      const aDistance = Math.abs(a.location.x - call.coordinates.x) + Math.abs(a.location.y - call.coordinates.y);
      const bDistance = Math.abs(b.location.x - call.coordinates.x) + Math.abs(b.location.y - call.coordinates.y);
      return aDistance - bDistance;
    })[0];
}

export function randomTrafficUpdate(lights) {
  const signals = ["Green", "Yellow", "Red"];
  const congestion = ["Low", "Medium", "High"];

  return lights.map((light) => ({
    ...light,
    signal: signals[Math.floor(Math.random() * signals.length)],
    congestion: congestion[Math.floor(Math.random() * congestion.length)]
  }));
}
