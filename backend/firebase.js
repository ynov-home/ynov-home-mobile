const admin = require('firebase-admin');
const serviceAccount = require('../mqtt-sensor-app/firebaseServiceAccount.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ynov-home-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();

// Function to get all devices from Firestore
const getDevices = async () => {
  try {
    const devicesRef = db.collection('devices');
    const snapshot = await devicesRef.get();
    let devices = [];
    snapshot.forEach(doc => {
      devices.push({ id: doc.id, ...doc.data() });
    });
    return devices;
  } catch (error) {
    console.error('Error getting devices:', error);
    throw error;
  }
};

// Function to update a device status
const updateDeviceStatus = async (deviceId, status) => {
  try {
    const deviceRef = db.collection('devices').doc(deviceId);
    await deviceRef.update({ status });
  } catch (error) {
    console.error('Error updating device status:', error);
    throw error;
  }
};

module.exports = { getDevices, updateDeviceStatus };
