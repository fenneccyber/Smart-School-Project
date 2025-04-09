const express = require('express');
const path = require('path'); // Needed if serving static files from backend
const cors = require('cors'); // Import CORS package

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors()); // Enable CORS for all origins (simplest setup for dev)
app.use(express.json()); // JSON body parser (already present)

// --- In-Memory Storage (Replace with Database later) ---
let maintenanceRequests = [];
let nextId = 1;

// --- API Routes --- 

// Example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the Smart School Backend!' });
});

// --- Maintenance Request Routes ---

// GET all maintenance requests
app.get('/api/maintenance', (req, res) => {
    // Return requests in reverse chronological order (newest first)
    res.json(maintenanceRequests.slice().reverse()); 
});

// POST a new maintenance request
app.post('/api/maintenance', (req, res) => {
    const { location, description, priority } = req.body;

    // Basic validation
    if (!location || !description || !priority) {
        return res.status(400).json({ error: 'Missing required fields (location, description, priority)' });
    }

    const newRequest = {
        id: nextId++, // Simple incrementing ID
        location,
        description,
        priority,
        status: 'submitted', // Initial status
        timestamp: new Date().toISOString()
    };

    maintenanceRequests.push(newRequest);
    console.log('Added Maintenance Request:', newRequest);
    
    // Respond with the created request (good practice)
    res.status(201).json(newRequest);
});

// TODO: Add routes for updating status (PUT/PATCH) and deleting (DELETE) later

// --- Optional: Serve Frontend Static Files --- 
// If you want the Node.js server to ALSO serve the frontend 
// (instead of just using GitHub Pages for the frontend)
// Uncomment the following lines:
/*
app.use(express.static(path.join(__dirname, '..'))); // Serve files from root

// Handle SPA routing (send all non-API requests to index.html)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  } else {
    // If it's an API call that wasn't caught, send 404
    res.status(404).send('API endpoint not found');
  }
});
*/

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 