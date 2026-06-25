import Panel from "./Panel.jsx";

export default function TrafficHub({ lights, onRefresh }) {
  return (
    <Panel
      title="Traffic Light Status Hub"
      subtitle="Broadcasts intersection signal and congestion status"
      action={<button className="secondaryButton" onClick={onRefresh}>Refresh</button>}
    >
      <div className="trafficGrid">
        {lights.map((light) => (
          <article className="trafficCard" key={light.junction}>
            <strong><span className={`signal ${light.signal.toLowerCase()}`} />{light.junction}</strong>
            <div className="cardMeta">{light.signal} signal · {light.congestion} congestion</div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
