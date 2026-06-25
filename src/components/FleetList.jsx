import Panel from "./Panel.jsx";

export default function FleetList({ ambulances, equipmentFilter, onFilterChange, onToggleStatus }) {
  const filteredAmbulances = equipmentFilter === "All"
    ? ambulances
    : ambulances.filter((unit) => unit.equipment.includes(equipmentFilter));

  const equipmentOptions = ["All", ...new Set(ambulances.flatMap((unit) => unit.equipment))];

  return (
    <Panel title="Ambulance Supply List" subtitle="Vehicle supplies, crew, and current status">
      <label className="fullLabel">
        Filter by equipment
        <select value={equipmentFilter} onChange={(event) => onFilterChange(event.target.value)}>
          {equipmentOptions.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>

      <div className="cardList spacedTop">
        {filteredAmbulances.map((unit) => (
          <article className="fleetCard" key={unit.id}>
            <div className="cardTitle">
              <span>{unit.id}</span>
              <span className={`badge ${unit.status.toLowerCase()}`}>{unit.status}</span>
            </div>
            <div className="cardMeta">
              Crew: {unit.crew}<br />
              Supplies: {unit.equipment.join(", ")}
            </div>
            <button className="secondaryButton spacedTop" onClick={() => onToggleStatus(unit.id)}>
              Toggle Status
            </button>
          </article>
        ))}
      </div>
    </Panel>
  );
}
