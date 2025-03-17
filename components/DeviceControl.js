import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import mqtt from "mqtt";
import firestore from "@react-native-firebase/firestore";

// MQTT & Firebase Config
const MQTT_BROKER = "wss://your-mqtt-broker-ip:port"; // WebSocket connection
const MQTT_TOPIC = "iot/device/control";

export default function DeviceControl() {
  const [devices, setDevices] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER, { protocol: "wss" });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT");
    });

    setClient(mqttClient);

    const unsubscribe = firestore()
      .collection("devices")
      .onSnapshot(snapshot => {
        const deviceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDevices(deviceList);
      });

    return () => {
      mqttClient.end();
      unsubscribe();
    };
  }, []);

  const toggleDevice = (device) => {
    const newStatus = device.status === "on" ? "off" : "on";

    if (client) {
      client.publish(MQTT_TOPIC, JSON.stringify({ id: device.id, status: newStatus }));
    }

    firestore().collection("devices").doc(device.id).update({ status: newStatus });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Device Control</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text style={styles.deviceText}>{item.name} - {item.status.toUpperCase()}</Text>
            <Button
              title={item.status === "on" ? "Turn OFF" : "Turn ON"}
              onPress={() => toggleDevice(item)}
              color={item.status === "on" ? "red" : "green"}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  deviceItem: { flexDirection: "row", justifyContent: "space-between", padding: 15, marginBottom: 10, backgroundColor: "#fff", borderRadius: 8, shadowOpacity: 0.1, elevation: 2 },
  deviceText: { fontSize: 18 },
});
