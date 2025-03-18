import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { getDevices, updateDeviceStatus } from "./firebaseService";

export default function App() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const data = await getDevices();
            if (Array.isArray(data)) {
                setDevices(data);
            } else {
                console.error("getDevices() did not return an array:", data);
            }
        } catch (error) {
            console.error("Error fetching devices:", error);
        }
    };

    const toggleDevice = async (device) => {
        try {
            const newStatus = device.status === "on" ? "off" : "on";
            await updateDeviceStatus(device.id, newStatus);
            setDevices((prevDevices) =>
                prevDevices.map((d) =>
                    d.id === device.id ? { ...d, status: newStatus } : d
                )
            );
        } catch (error) {
            console.error("Error updating device status:", error);
        }
    };

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
