import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Function to get all devices
export const getDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices`);
    return response.data;  // Return the device list
  } catch (error) {
    console.error('Error fetching devices:', error);
    return [];
  }
};

// Function to update device status
export const updateDeviceStatus = async (deviceId, status) => {
  try {
    const response = await axios.post(`${API_URL}/device/update`, { deviceId, status });
    console.log(response.data.message);  // Log success message
  } catch (error) {
    console.error('Error updating device status:', error);
  }
};