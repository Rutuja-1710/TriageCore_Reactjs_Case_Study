import React from "react";
import Panel from "./Panel.jsx";

export default function NewCallForm({ onAddCall }) {
  const [form, setForm] = React.useState({
    patient: "",
    issue: "",
    location: "",
    severity: 70
  });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitCall(event) {
    event.preventDefault();
    if (!form.patient.trim() || !form.issue.trim() || !form.location.trim()) return;
    onAddCall(form);
    setForm({ patient: "", issue: "", location: "", severity: 70 });
  }

  return (
    <Panel title="New Emergency Intake" subtitle="Create an incoming call and push it into the queue">
      <form className="newCallForm" onSubmit={submitCall}>
        <input value={form.patient} onChange={(event) => updateField("patient", event.target.value)} placeholder="Patient name" />
        <input value={form.issue} onChange={(event) => updateField("issue", event.target.value)} placeholder="Emergency issue" />
        <input value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Location" />
        <label>
          Severity: {form.severity}
          <input
            type="range"
            min="1"
            max="100"
            value={form.severity}
            onChange={(event) => updateField("severity", Number(event.target.value))}
          />
        </label>
        <button type="submit">Add Call</button>
      </form>
    </Panel>
  );
}
