
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getDevices, updateDeviceStatus } from '../api';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await getDevices();
      setDevices(devices);
    };

    fetchDevices();
  }, []);

  const toggleDevice = async (deviceId, currentStatus) => {
    const newStatus = currentStatus === 'on' ? 'off' : 'on';
    await updateDeviceStatus(deviceId, newStatus);
    setDevices(devices.map(device => 
      device.id === deviceId ? { ...device, status: newStatus } : device
    ));
  };

  return (
    <View>
      {devices.map(device => (
        <View key={device.id}>
          <Text>{device.name} - {device.status}</Text>
          <Button
            title={`Turn ${device.status === 'on' ? 'off' : 'on'}`}
            onPress={() => toggleDevice(device.id, device.status)}
          />
        </View>
      ))}
    </View>
  );
};

export default DeviceList;
