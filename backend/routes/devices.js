
const express = require('express');
const router = express.Router();
const db = require('../firebase');  // Import Firebase Firestore

// Get all devices
router.get('/devices', async (req, res) => {
  try {
    const devicesSnapshot = await db.collection('devices').get();
    let devices = [];
    devicesSnapshot.forEach((doc) => {
      devices.push({ id: doc.id, ...doc.data() });
    });
    res.json(devices);  // Send devices data as a response
  } catch (error) {
    res.status(500).json({ error: "Error fetching devices" });
  }
});

// Update device status (ON/OFF)
router.post('/device/update', async (req, res) => {
  const { deviceId, status } = req.body;
  
  try {
    const deviceRef = db.collection('devices').doc(deviceId);
    await deviceRef.update({ status: status });
    res.json({ message: `Device ${deviceId} updated to ${status}` });
  } catch (error) {
    res.status(500).json({ error: "Error updating device status" });
  }
});

module.exports = router;

