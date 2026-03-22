// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmergencyForm from './components/EmergencyForm';
//import EmergencyList from './components/EmergencyList';

function App() {
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/emergencies')
      .then(res => setEmergencies(res.data));
  }, []);

  const handleNewEmergency = (newEmergency) => {
    setEmergencies([...emergencies, { ...newEmergency }]);
  };

  return (
    <div className="app-container">
      <EmergencyForm onNewEmergency={handleNewEmergency} />
      {/* <EmergencyList emergencies={emergencies} /> */}
    </div>
  );
}

export default App;