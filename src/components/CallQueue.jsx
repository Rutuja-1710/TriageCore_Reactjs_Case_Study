import Panel from "./Panel.jsx";
import { severityClass, severityLabel } from "../utils/dispatch.js";

export default function CallQueue({ calls, onDispatch, onComplete }) {
  const sortedCalls = [...calls].sort((a, b) => b.severity - a.severity);

  return (
    <Panel title="Call Priority Queue" subtitle="Incoming calls sorted by trauma severity">
      <div className="cardList">
        {sortedCalls.map((call) => (
          <article className={`queueCard ${severityClass(call.severity)}`} key={call.id}>
            <div className="cardTitle">
              <span>{call.id} · {call.patient}</span>
              <span className={`badge ${severityClass(call.severity)}`}>{severityLabel(call.severity)}</span>
            </div>
            <p>{call.issue}</p>
            <div className="cardMeta">
              {call.location} · Risk {call.severity} · {call.status}
              {call.assignedUnit && ` · ${call.assignedUnit}`}
            </div>
            <div className="buttonRow">
              <button onClick={() => onDispatch(call.id)} disabled={call.status !== "Waiting"}>Dispatch Best Unit</button>
              <button className="secondaryButton" onClick={() => onComplete(call.id)} disabled={call.status === "Closed"}>Close</button>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
