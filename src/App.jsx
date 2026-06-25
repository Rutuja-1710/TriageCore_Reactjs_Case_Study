import React from "react";
import Header from "./components/Header.jsx";
import LiveMap from "./components/LiveMap.jsx";
import CallQueue from "./components/CallQueue.jsx";
import FleetList from "./components/FleetList.jsx";
import PatientFinder from "./components/PatientFinder.jsx";
import RiskSorter from "./components/RiskSorter.jsx";
import TrafficHub from "./components/TrafficHub.jsx";
import HospitalFinder from "./components/HospitalFinder.jsx";
import NewCallForm from "./components/NewCallForm.jsx";
import {
  initialAmbulances,
  initialCalls,
  initialHospitals,
  initialTrafficLights,
  patientRecords
} from "./data/seedData.js";
import {
  calculateEta,
  findBestHospital,
  pickNearestAvailableAmbulance,
  randomTrafficUpdate
} from "./utils/dispatch.js";

export default function App() {
  const [ambulances, setAmbulances] = React.useState(initialAmbulances);
  const [calls, setCalls] = React.useState(initialCalls);
  const [hospitals, setHospitals] = React.useState(initialHospitals);
  const [trafficLights, setTrafficLights] = React.useState(initialTrafficLights);
  const [selectedCallId, setSelectedCallId] = React.useState(initialCalls[0].id);
  const [selectedAmbulanceId, setSelectedAmbulanceId] = React.useState(initialAmbulances[0].id);
  const [equipmentFilter, setEquipmentFilter] = React.useState("All");
  const [selectedHospital, setSelectedHospital] = React.useState("");
  const [routeHistory, setRouteHistory] = React.useState([]);
  const [routeMessage, setRouteMessage] = React.useState("Select a call and ambulance to generate the quickest route.");

  const visibleCalls = calls.filter((call) => call.status !== "Closed");
  const activeCalls = visibleCalls.length;
  const availableUnits = ambulances.filter((unit) => unit.status === "Available").length;
  const openBeds = hospitals.reduce((total, hospital) => total + hospital.beds, 0);
  const dispatchedCalls = calls.filter((call) => call.status === "Dispatched").length;

  function makeRoute(callId = selectedCallId, ambulanceId = selectedAmbulanceId, currentMessage = routeMessage) {
    const call = calls.find((item) => item.id === callId);
    const ambulance = ambulances.find((item) => item.id === ambulanceId);
    const hospital = findBestHospital(hospitals);

    if (!call || !ambulance || !hospital) {
      setRouteMessage("Route cannot be planned because a call, ambulance, or hospital is missing.");
      return null;
    }

    const eta = calculateEta(call, hospital, trafficLights);
    const highTraffic = trafficLights.filter((light) => light.congestion === "High").length;
    const nextMessage = `${ambulance.id} -> ${call.location} -> ${hospital.name}. ETA ${eta} minutes. ${highTraffic} high-traffic junctions bypassed.`;

    setRouteHistory((history) => [currentMessage, ...history].slice(0, 5));
    setRouteMessage(nextMessage);
    setSelectedHospital(hospital.name);
    return { call, ambulance, hospital, eta };
  }

  function undoRoute() {
    setRouteHistory((history) => {
      if (history.length === 0) return history;
      const [previous, ...rest] = history;
      setRouteMessage(previous);
      return rest;
    });
  }

  function dispatchCall(callId) {
    const call = calls.find((item) => item.id === callId);
    if (!call) return;

    const ambulance = pickNearestAvailableAmbulance(ambulances, call);
    const hospital = findBestHospital(hospitals);

    if (!ambulance || !hospital) {
      setRouteMessage("Dispatch blocked: no available ambulance or trauma bed.");
      return;
    }

    setSelectedCallId(call.id);
    setSelectedAmbulanceId(ambulance.id);

    const eta = calculateEta(call, hospital, trafficLights);
    setRouteHistory((history) => [routeMessage, ...history].slice(0, 5));
    setRouteMessage(`DISPATCHED: ${ambulance.id} assigned to ${call.id}. Destination ${hospital.name}. ETA ${eta} minutes.`);
    setSelectedHospital(hospital.name);

    setCalls((current) => current.map((item) => (
      item.id === call.id
        ? { ...item, status: "Dispatched", assignedUnit: ambulance.id, assignedHospital: hospital.name }
        : item
    )));

    setAmbulances((current) => current.map((unit) => (
      unit.id === ambulance.id ? { ...unit, status: "Busy", location: call.coordinates } : unit
    )));

    setHospitals((current) => current.map((item) => (
      item.name === hospital.name ? { ...item, beds: Math.max(0, item.beds - 1) } : item
    )));
  }

  function completeCall(callId) {
    const call = calls.find((item) => item.id === callId);

    setCalls((current) => current.map((item) => (
      item.id === callId ? { ...item, status: "Closed" } : item
    )));

    if (call?.assignedUnit) {
      setAmbulances((current) => current.map((unit) => (
        unit.id === call.assignedUnit ? { ...unit, status: "Available" } : unit
      )));
    }
  }

  function toggleAmbulanceStatus(id) {
    setAmbulances((current) => current.map((unit) => {
      if (unit.id !== id) return unit;
      const nextStatus = unit.status === "Available" ? "Maintenance" : "Available";
      return { ...unit, status: nextStatus };
    }));
  }

  function addCall(form) {
    const newCall = {
      id: `C-${Math.floor(9100 + Math.random() * 800)}`,
      patient: form.patient,
      issue: form.issue,
      severity: Number(form.severity),
      location: form.location,
      status: "Waiting",
      assignedUnit: "",
      assignedHospital: "",
      coordinates: {
        x: Math.floor(12 + Math.random() * 76),
        y: Math.floor(18 + Math.random() * 68)
      }
    };

    setCalls((current) => [newCall, ...current]);
    setSelectedCallId(newCall.id);
    setRouteMessage(`${newCall.id} added to the priority queue.`);
  }

  return (
    <>
      <Header
        activeCalls={activeCalls}
        availableUnits={availableUnits}
        openBeds={openBeds}
        dispatchedCalls={dispatchedCalls}
      />

      <main className="dashboard">
        <LiveMap
          ambulances={ambulances}
          calls={visibleCalls}
          hospitals={hospitals}
          selectedCallId={selectedCallId}
          selectedAmbulanceId={selectedAmbulanceId}
          routeMessage={routeMessage}
          routeHistory={routeHistory}
          onSelectCall={setSelectedCallId}
          onSelectAmbulance={setSelectedAmbulanceId}
          onPlanRoute={() => makeRoute()}
          onUndoRoute={undoRoute}
        />

        <CallQueue calls={visibleCalls} onDispatch={dispatchCall} onComplete={completeCall} />
        <FleetList
          ambulances={ambulances}
          equipmentFilter={equipmentFilter}
          onFilterChange={setEquipmentFilter}
          onToggleStatus={toggleAmbulanceStatus}
        />
        <PatientFinder patients={patientRecords} />
        <RiskSorter calls={visibleCalls} />
        <TrafficHub lights={trafficLights} onRefresh={() => setTrafficLights(randomTrafficUpdate)} />
        <NewCallForm onAddCall={addCall} />
        <HospitalFinder hospitals={hospitals} selectedHospital={selectedHospital} />
      </main>
    </>
  );
}
