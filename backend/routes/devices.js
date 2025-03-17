const express = require('express');
const { getDevices, updateDeviceStatus } = require('../firebase'); // Import the functions from firebase.js

const router = express.Router();

// GET all devices
router.get('/', async (req, res) => {
  try {
    const devices = await getDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).send('Error fetching devices');
  }
});

// PUT to update a device status (on/off)
router.put('/:deviceId', async (req, res) => {
  const { deviceId } = req.params;
  const { status } = req.body;

  try {
    await updateDeviceStatus(deviceId, status);
    res.status(200).send(`Device ${deviceId} updated to ${status}`);
  } catch (error) {
    res.status(500).send('Error updating device');
  }
});

module.exports = router;
