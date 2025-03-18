const express = require('express');
const cors = require('cors');
const devicesRouter = require('./routes/devices');

const app = express();
const port = process.env.PORT || 5001;

// Middleware to handle CORS
app.use(cors());
app.use(express.json()); // to parse incoming JSON data

// Define routes
app.use('/api/devices', devicesRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
