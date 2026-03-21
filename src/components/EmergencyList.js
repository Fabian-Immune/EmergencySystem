// src/components/EmergencyList.js
import React from 'react';

function EmergencyList({ emergencies }) {
  return (
    <div className="list-container">
      <h2>Reported Emergencies</h2>
      <ul>
        {emergencies.map((em) => (
          <li key={em.id}>
            <strong>{em.type}</strong> at {em.location} <br />
            {em.description} <br />
            <small>{new Date(em.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmergencyList;