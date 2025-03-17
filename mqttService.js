import mqtt from 'mqtt';

const brokerUrl = "mqtt://broker.hivemq.com"; 
const topic = "sensor/control";

let client;

export const connectMqtt = (onMessageReceived) => {
    client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
        console.log("Connected to MQTT broker");
        client.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to ${topic}`);
            }
        });
    });

    client.on("message", (topic, message) => {
        console.log(`Message received: ${message.toString()}`);
        onMessageReceived(message.toString());
    });

    client.on("error", (err) => {
        console.error("MQTT Error:", err);
    });
};

export const sendCommand = (command) => {
    if (client) {
        client.publish(topic, command);
        console.log(`Sent command: ${command}`);
    }
};
