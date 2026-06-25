import Panel from "./Panel.jsx";

export default function LiveMap({
  ambulances,
  calls,
  hospitals,
  selectedCallId,
  selectedAmbulanceId,
  routeMessage,
  routeHistory,
  onSelectCall,
  onSelectAmbulance,
  onPlanRoute,
  onUndoRoute
}) {
  const selectedCall = calls.find((call) => call.id === selectedCallId);
  const selectedAmbulance = ambulances.find((unit) => unit.id === selectedAmbulanceId);

  return (
    <Panel
      title="Live Fleet Map"
      subtitle="Ambulance positions, emergency calls, hospitals, and route planning"
      className="mapPanel"
      action={
        <button className="iconButton" onClick={onUndoRoute} disabled={routeHistory.length === 0} title="Undo route edit">
          ↶
        </button>
      }
    >
      <div className="cityMap" aria-label="City dispatch map">
        <div className="route routeOne" />
        <div className="route routeTwo" />
        <div className="route routeThree" />

        {hospitals.map((hospital, index) => (
          <div
            className="hospitalMarker"
            key={hospital.name}
            style={{ left: `${18 + index * 25}%`, top: `${22 + (index % 2) * 48}%` }}
            title={`${hospital.name}: ${hospital.beds} beds`}
          >
            H
          </div>
        ))}

        {ambulances.map((unit) => (
          <button
            className={`mapMarker ambulanceMarker ${unit.id === selectedAmbulanceId ? "selected" : ""}`}
            key={unit.id}
            style={{ left: `${unit.location.x}%`, top: `${unit.location.y}%` }}
            onClick={() => onSelectAmbulance(unit.id)}
            title={`${unit.id}: ${unit.status}`}
          >
            {unit.id.replace("A-", "")}
          </button>
        ))}

        {calls.map((call) => (
          <button
            className={`mapMarker callMarker ${call.id === selectedCallId ? "selected" : ""}`}
            key={call.id}
            style={{ left: `${call.coordinates.x}%`, top: `${call.coordinates.y}%` }}
            onClick={() => onSelectCall(call.id)}
            title={`${call.id}: ${call.issue}`}
          >
            !
          </button>
        ))}
      </div>

      <div className="routeTools">
        <label>
          Emergency Call
          <select value={selectedCallId} onChange={(event) => onSelectCall(event.target.value)}>
            {calls.map((call) => (
              <option key={call.id} value={call.id}>{call.id} - {call.location}</option>
            ))}
          </select>
        </label>
        <label>
          Ambulance
          <select value={selectedAmbulanceId} onChange={(event) => onSelectAmbulance(event.target.value)}>
            {ambulances.map((unit) => (
              <option key={unit.id} value={unit.id}>{unit.id} - {unit.status}</option>
            ))}
          </select>
        </label>
        <button onClick={onPlanRoute}>Plan Fastest Route</button>
      </div>

      <div className="routeResult">
        <strong>{selectedAmbulance?.id || "No unit"} to {selectedCall?.location || "no call"}</strong>
        <p>{routeMessage}</p>
      </div>
    </Panel>
  );
}
