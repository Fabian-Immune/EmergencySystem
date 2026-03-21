const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'emergency_system'
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ MySQL Connected...');
});

// Create new emergency entry
app.post('/emergency', (req, res) => {
    const { type, location, description } = req.body;
    const sql = 'INSERT INTO emergencies (type, location, description) VALUES (?, ?, ?)';
    db.query(sql, [type, location, description], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Emergency entry created', id: result.insertId });
    });
});

// Get all emergencies
app.get('/emergencies', (req, res) => {
    db.query('SELECT * FROM emergencies ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get single emergency by ID
app.get('/emergency/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM emergencies WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Emergency not found' });
        }
        res.json(results[0]);
    });
});

app.listen(3000, () => {
    console.log('🚀 Backend running on http://localhost:3000');
});