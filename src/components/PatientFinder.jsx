import React from "react";
import Panel from "./Panel.jsx";

export default function PatientFinder({ patients }) {
  const [query, setQuery] = React.useState("");
  const patient = patients.find((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <Panel title="Patient Record Finder" subtitle="Verify medical history before dispatch">
      <div className="searchRow">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search patient name"
        />
      </div>

      {!query.trim() && <div className="mutedCard">No patient selected.</div>}
      {query.trim() && !patient && <div className="mutedCard">No matching patient record found.</div>}
      {query.trim() && patient && (
        <article className="patientCard">
          <div className="cardTitle">
            <span>{patient.name}</span>
            <span>{patient.blood}</span>
          </div>
          <div className="cardMeta">
            Age: {patient.age}<br />
            Conditions: {patient.conditions}<br />
            Allergy: {patient.allergy}
          </div>
        </article>
      )}
    </Panel>
  );
}
