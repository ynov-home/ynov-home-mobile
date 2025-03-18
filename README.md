# MQTT Sensor Control App

This project provides a platform for controlling IoT devices via MQTT and Firebase. It uses React Native for the frontend, a backend powered by Node.js and Express, and Firebase for device status storage. The app allows users to control devices (turn on/off) and display device status in real-time.

---

## Project Structure

The project consists of two main parts:

1. **Backend** (API and Firebase Integration)
   - Located in the `backend/` directory.
   - Handles communication with Firebase and the MQTT server.
2. **Frontend** (React Native App)
   - Located in the `mqtt-sensor-app/` directory.
   - Provides the user interface for controlling devices.

---

## Prerequisites

Before you begin, ensure you have the following installed:

### 1. **Node.js**
   - Download and install Node.js from [here](https://nodejs.org/).
   - Verify the installation:
     ```bash
     node -v
     npm -v
     ```

### 2. **Firebase Project**
   - Set up Firebase in the [Firebase Console](https://console.firebase.google.com/).
   - Download the `firebaseServiceAccount.json` file and place it in the respective directory.

### 3. **React Native Development Environment**
   - Follow the official [React Native Setup Guide](https://reactnative.dev/docs/environment-setup).
   - Install dependencies based on your target platform (iOS or Android).

### 4. **CocoaPods (for iOS builds)**
   - Required if running the app on iOS:
     ```bash
     sudo gem install cocoapods
     ```

---

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Place `firebaseServiceAccount.json` in `backend/`.
4. Start the server:
   ```bash
   node server.js
   ```
   The backend server will now be running and listening for requests.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd mqtt-sensor-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install iOS dependencies (macOS only):
   ```bash
   npx pod-install
   ```
4. Start the application:
   ```bash
   npx expo start
   ```

---

## Features

- **Device Control:**
  - View devices fetched from Firebase.
  - Toggle devices on/off via UI.
- **Voice Control:**
  - Issue commands like "Device 1 off" or "Device 2 on".
  - The command is processed and sent to MQTT.
- **Real-Time Updates:**
  - Devices' statuses update in real-time via MQTT.
  - Syncs with Firebase.

---

## File Structure Overview

### Backend (Node.js + Firebase)

- `firebase.js`: Handles Firebase configuration.
- `server.js`: Starts the Express server and sets up routes.
- `routes/devices.js`: Contains routes for device interactions.

### Frontend (React Native)

- `App.js`: Main application component.
- `DeviceList.js`: Displays device list and toggles status.
- `firebaseService.js`: Manages Firebase interactions.
- `mqttService.js`: Handles MQTT communication.

---

## API Endpoints (Backend)

The backend exposes the following endpoints:

- **GET /devices**: Fetch all devices from Firebase.
- **POST /devices/update**: Update a device's status.

Example Request:
```json
{
  "deviceId": "device1",
  "status": "on"
}
```

Example Response:
```json
{
  "message": "Device updated successfully"
}
```

---

## Voice Command Functionality

The app listens for commands such as "turn on device 1" or "turn off device 2" and:

1. Converts speech to text.
2. Interprets the command.
3. Sends an API request to control the device.


---
<img width="401" alt="Screenshot 2025-03-18 at 15 52 36" src="https://github.com/user-attachments/assets/e1794104-1df1-4f72-a70e-d8eeaffe96fd" />

