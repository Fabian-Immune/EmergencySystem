import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Paper
} from '@mui/material';

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
    if (!form.reporter_name || !form.type || !form.location) {
      alert('Please fill in all required fields.');
      return;
    }
    await fetch('http://localhost:4000/api/emergency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Emergency reported!');
    setForm({ reporter_name: '', type: '', severity: 'low', location: '', description: '' });
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom color="error">
          Report an Emergency
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Full Name"
            name="reporter_name"
            value={form.reporter_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Emergency Type</InputLabel>
            <Select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <MenuItem value="Weather-related">Weather-related</MenuItem>
              <MenuItem value="Geological">Geological</MenuItem>
              <MenuItem value="Environmental">Environmental</MenuItem>
              <MenuItem value="Industrial Accidents">Industrial Accidents</MenuItem>
              <MenuItem value="Infrastructure Failures">Infrastructure Failures</MenuItem>
              <MenuItem value="Fire">Fire</MenuItem>
              <MenuItem value="Public Health">Public Health</MenuItem>
              <MenuItem value="Biological Agents">Biological Agents</MenuItem>
              <MenuItem value="Civil Disturbances">Civil Disturbances</MenuItem>
              <MenuItem value="Terrorism">Terrorism</MenuItem>
              <MenuItem value="Violence">Violence</MenuItem>
              <MenuItem value="Car Crash">Car Crash</MenuItem>
              <MenuItem value="Medical">Medical</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            fullWidth
            label="Emergency Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            margin="normal"
            required
          /> */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Severity</InputLabel>
            <Select
              name="severity"
              value={form.severity}
              onChange={handleChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Emergency
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default EmergencyForm;
