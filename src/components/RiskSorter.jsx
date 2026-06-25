import Panel from "./Panel.jsx";
import { severityClass } from "../utils/dispatch.js";

export default function RiskSorter({ calls }) {
  return (
    <Panel title="Incident Risk Sorter" subtitle="Ranks active emergencies by life threat">
      <div className="cardList">
        {[...calls].sort((a, b) => b.severity - a.severity).map((call, index) => (
          <article className="riskCard" key={call.id}>
            <div className="cardTitle">
              <span>#{index + 1} {call.issue}</span>
              <span className={`riskScore ${severityClass(call.severity)}`}>{call.severity}</span>
            </div>
            <div className="riskBar">
              <span style={{ width: `${call.severity}%` }} />
            </div>
            <div className="cardMeta">{call.patient} · {call.location}</div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
