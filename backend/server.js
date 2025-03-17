
const express = require('express');
const bodyParser = require('body-parser');
const devicesRoutes = require('./routes/devices');  // Import routes

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the devices routes
app.use('/api', devicesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
