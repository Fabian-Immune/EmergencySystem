import React, { useState } from 'react';

function EmergencyForm() {
  const [form, setForm] = useState({
    reporter_name: '',
    type: '',
    severity: 'low',
    location: '',
    description: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:4000/api/emergency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Emergency reported!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="reporter_name" placeholder="Type your Full Name" onChange={handleChange} />
      <select name="type" placeholder="Emergency Type" onChange={handleChange}>
        <option value="Natural Disasters & Severe Weather">Low</option>
        <option value="Public Health & Biological Emergencies">Medium</option>
        <option value="Human-Caused/Security Emergencies">High</option>
        <option value="Technological & Hazardous Materials">Critical</option>
        <option value="Technological & Hazardous Materials">Critical</option>
      </select>
      <select name="severity" onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      <input name="location" placeholder="Location" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <button type="submit">Report Emergency</button>
    </form>
  );
}

export default EmergencyForm;