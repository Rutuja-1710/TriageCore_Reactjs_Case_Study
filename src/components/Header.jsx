export default function Header({ activeCalls, availableUnits, openBeds, dispatchedCalls }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">ITM Skills University</p>
        <h1>TriageCore</h1>
      </div>
      <div className="statusStrip" aria-label="System status">
        <span><strong>{activeCalls}</strong>Active Calls</span>
        <span><strong>{availableUnits}</strong>Units Free</span>
        <span><strong>{openBeds}</strong>Trauma Beds</span>
        <span><strong>{dispatchedCalls}</strong>Dispatched</span>
      </div>
    </header>
  );
}
