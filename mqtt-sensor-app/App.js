import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import Voice from "@react-native-voice/voice";
import { getDevices, updateDeviceStatus } from "./firebaseService";

export default function App() {
    const [devices, setDevices] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState("");

    useEffect(() => {
        fetchDevices();

        // Attach event listeners
        Voice.onSpeechResults = (event) => {
            if (event.value && event.value.length > 0) {
                setRecognizedText(event.value[0]); // Take the first recognized phrase
            }
        };

        Voice.onSpeechError = (error) => {
            console.error("Speech error:", error);
        };

        return () => {
            // Cleanup event listeners on unmount
            Voice.destroy().then(Voice.removeAllListeners);
        };
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

    const startListening = async () => {
        try {
            setIsListening(true);
            await Voice.start("en-US"); // Change language if needed
        } catch (error) {
            console.error("Error starting voice recognition:", error);
            setIsListening(false);
        }
    };

    const stopListening = async () => {
        try {
            setIsListening(false);
            await Voice.stop();
        } catch (error) {
            console.error("Error stopping voice recognition:", error);
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

            {/* Speech-to-Text Button */}
            <View style={styles.voiceContainer}>
                <Button 
                    title={isListening ? "Stop Listening" : "Start Listening"} 
                    onPress={isListening ? stopListening : startListening} 
                    color="#007AFF"
                />
                <Text style={styles.recognizedText}>You said: {recognizedText}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    deviceContainer: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1 },
    voiceContainer: { marginTop: 20, alignItems: "center" },
    recognizedText: { marginTop: 10, fontSize: 16, color: "#333" },
});

