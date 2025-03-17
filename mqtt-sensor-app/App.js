import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
// import { connectMqtt, sendCommand } from "./mqttService";
import { getDevices, updateDeviceStatus } from "./firebaseService";

export default function App() {
    const [devices, setDevices] = useState([]);

    // useEffect(() => {
    //     fetchDevices();
    //     connectMqtt((message) => {
    //         console.log("MQTT Update:", message);
    //         fetchDevices();
    //     });
    // }, []);

    const fetchDevices = async () => {
        const data = await getDevices();
        setDevices(data);
    };

    // const toggleDevice = async (device) => {
    //     const newStatus = device.status === "on" ? "off" : "on";
    //     await updateDeviceStatus(device.id, newStatus);
    //     sendCommand(`${device.id}:${newStatus}`); // Send MQTT command
    //     fetchDevices();
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>MQTT Sensor Control</Text>
            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.deviceContainer}>
                        <Text>{item.name} - {item.status}</Text>
                        <Button title={item.status === "on" ? "Turn Off" : "Turn On"} onPress={() => toggleDevice(item)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    deviceContainer: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1 },
});
