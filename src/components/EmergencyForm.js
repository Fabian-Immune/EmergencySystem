// src/components/EmergencyForm.js
import React, { useState } from 'react';
import axios from 'axios';

function EmergencyForm({ onNewEmergency }) {
  const [formData, setFormData] = useState({ type: '', location: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/emergency', formData);
    onNewEmergency(response.data);
    setFormData({ type: '', location: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Report Emergency</h2>
      <input id="type" placeholder="Type" value={formData.type} onChange={handleChange} />
      <input id="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <textarea id="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmergencyForm;