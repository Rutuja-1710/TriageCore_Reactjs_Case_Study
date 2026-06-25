export const initialAmbulances = [
  {
    id: "A-101",
    crew: "Dr. Meera, EMT Kabir",
    status: "Available",
    equipment: ["Ventilator", "AED", "Oxygen", "Trauma Kit"],
    location: { x: 18, y: 28 }
  },
  {
    id: "A-204",
    crew: "Paramedic Sana, EMT Vihaan",
    status: "Busy",
    equipment: ["AED", "Oxygen", "Burn Kit"],
    location: { x: 44, y: 68 }
  },
  {
    id: "A-318",
    crew: "Dr. Arjun, EMT Tara",
    status: "Available",
    equipment: ["Ventilator", "Defibrillator", "Pediatric Kit"],
    location: { x: 76, y: 45 }
  },
  {
    id: "A-422",
    crew: "Paramedic Neil, EMT Riya",
    status: "Maintenance",
    equipment: ["Oxygen", "Spine Board"],
    location: { x: 26, y: 78 }
  }
];

export const initialCalls = [
  {
    id: "C-9007",
    patient: "Aarav Shah",
    issue: "Chest trauma after collision",
    severity: 98,
    location: "Sector 12 Flyover",
    status: "Waiting",
    assignedUnit: "",
    assignedHospital: "",
    coordinates: { x: 64, y: 30 }
  },
  {
    id: "C-9014",
    patient: "Nisha Rao",
    issue: "Severe asthma attack",
    severity: 87,
    location: "Green Park Metro",
    status: "Waiting",
    assignedUnit: "",
    assignedHospital: "",
    coordinates: { x: 34, y: 52 }
  },
  {
    id: "C-9020",
    patient: "Farhan Khan",
    issue: "Fractured leg, conscious",
    severity: 58,
    location: "Lake Road Market",
    status: "Waiting",
    assignedUnit: "",
    assignedHospital: "",
    coordinates: { x: 80, y: 76 }
  },
  {
    id: "C-9026",
    patient: "Ira Mehta",
    issue: "Minor head injury",
    severity: 42,
    location: "North Campus Gate",
    status: "Waiting",
    assignedUnit: "",
    assignedHospital: "",
    coordinates: { x: 20, y: 42 }
  }
];

export const patientRecords = [
  {
    name: "Aarav Shah",
    age: 42,
    blood: "B+",
    conditions: "Hypertension, blood thinner medication",
    allergy: "Penicillin"
  },
  {
    name: "Nisha Rao",
    age: 19,
    blood: "O+",
    conditions: "Chronic asthma",
    allergy: "Dust and pollen"
  },
  {
    name: "Farhan Khan",
    age: 31,
    blood: "A-",
    conditions: "No major conditions",
    allergy: "None recorded"
  },
  {
    name: "Ira Mehta",
    age: 27,
    blood: "AB+",
    conditions: "Migraine history",
    allergy: "Ibuprofen"
  }
];

export const initialTrafficLights = [
  { junction: "J-12 Central", signal: "Green", congestion: "Low" },
  { junction: "J-18 Market", signal: "Red", congestion: "High" },
  { junction: "J-21 Bridge", signal: "Yellow", congestion: "Medium" },
  { junction: "J-31 Hospital Road", signal: "Green", congestion: "Low" },
  { junction: "J-44 Metro", signal: "Red", congestion: "High" },
  { junction: "J-52 Campus", signal: "Yellow", congestion: "Medium" },
  { junction: "J-66 Lake Road", signal: "Green", congestion: "Medium" },
  { junction: "J-73 Ring Road", signal: "Red", congestion: "High" }
];

export const initialHospitals = [
  { name: "City Trauma Centre", distance: 2.4, beds: 4, specialty: "Trauma and surgery" },
  { name: "Metro General Hospital", distance: 3.1, beds: 0, specialty: "Emergency medicine" },
  { name: "Lifeline Medical Institute", distance: 4.8, beds: 2, specialty: "Cardiac care" },
  { name: "North Care Hospital", distance: 5.5, beds: 6, specialty: "General trauma" }
];
