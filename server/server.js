const express = require('express');
const path = require('path'); // Needed if serving static files from backend

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (Example: JSON body parser)
app.use(express.json());

// --- API Routes --- 

// Example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the Smart School Backend!' });
});

// Placeholder for Maintenance Request Routes
// app.post('/api/maintenance', (req, res) => { ... });
// app.get('/api/maintenance', (req, res) => { ... });

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