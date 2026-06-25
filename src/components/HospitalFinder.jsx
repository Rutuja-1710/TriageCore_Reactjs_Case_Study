import Panel from "./Panel.jsx";

export default function HospitalFinder({ hospitals, selectedHospital }) {
  return (
    <Panel title="Hospital Bed Finder" subtitle="Assigns ambulances to the nearest available trauma bed" className="widePanel">
      <div className="hospitalGrid">
        {hospitals.map((hospital) => (
          <article
            className={`hospitalCard ${selectedHospital === hospital.name ? "selectedHospital" : ""}`}
            key={hospital.name}
          >
            <strong>{hospital.name}</strong>
            <div className="cardMeta">
              {hospital.distance} km away · {hospital.beds} trauma beds<br />
              {hospital.specialty}
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
