
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
   - Download and install Node.js from [here](https://nodejs.org/) if you don't have it.
   - You can check if it's installed by running:
     
     ```bash
     node -v
     npm -v
     ```

### 2. **Firebase Project**
   - You need to set up Firebase for your app. If you haven't already, go to the [Firebase Console](https://console.firebase.google.com/), create a project, and add your Firebase configuration.
   - Download the `firebaseServiceAccount.json` file from Firebase and add it to the `mqtt-sensor-app/` directory.

### 3. **React Native Development Environment**
   - Follow the instructions in the official React Native [Getting Started guide](https://reactnative.dev/docs/environment-setup).
   - Ensure you have the following installed:
     - **Xcode** for iOS development (macOS only).
     - **Android Studio** for Android development.

### 4. **CocoaPods** (for iOS builds)
   If you are building for iOS, you need to install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```


---

## Installation

### Backend Setup (Node.js, Express, Firebase)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Add your Firebase configuration file (`firebaseServiceAccount.json`) to the `backend/` directory.
   - Update the Firebase service initialization in `firebase.js` to point to the correct path for `firebaseServiceAccount.json`.

4. **Run the server:**
   ```bash
   node server.js
   ```
   The backend server will now be running and listening for requests.

### Frontend Setup (React Native)

1. **Navigate to the frontend directory:**
   ```bash
   cd mqtt-sensor-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (if you're building for iOS):**
   If you're on macOS and need to run the app on iOS, run:
   ```bash
   npx pod-install
   ```

4. **Run the app:**
   - For **iOS**:
     ```bash
     npx react-native run-ios
     ```
   - For **Android**:
     ```bash
     npx react-native run-android
     ```

5. The app will now launch on the emulator or a connected device.



---

## Features

- **Device Control:**
  - View the list of devices fetched from Firebase.
  - Turn devices on and off by clicking a button.
  
- **Voice Control:**
  - A button that listens for voice commands such as "Device 1 off" or "Device 2 on" and sends the corresponding command to the MQTT server.
  
- **Real-Time Updates:**
  - Devices' statuses are updated in real-time using MQTT.
  - Fetch updated device status from Firebase after each change.



---

## File Structure Overview

### Backend (Node.js + Firebase)

- **firebase.js**: Handles Firebase configuration and connection.
- **firebaseAdmin.js**: Firebase Admin SDK for managing the service account.
- **server.js**: Starts the Express server and configures the routes.
- **routes/devices.js**: Contains the routes for interacting with device data in Firebase.

### Frontend (React Native)

- **App.js**: Main application component where devices are listed and controlled.
- **DeviceList.js**: Displays a list of devices and allows toggling their status.
- **firebaseService.js**: Contains functions for interacting with Firebase to get and update device data.
- **mqttService.js**: Contains functions to handle MQTT connection and send commands to devices.



---

## API Endpoints (Backend)

The backend exposes the following endpoints:

- **GET /devices**: Fetch all devices from Firebase.
- **POST /devices/update**: Update the status of a device in Firebase.



---

## Voice Command Functionality

To allow for voice recognition and control, the app listens for commands like "turn on device 1" or "turn off device 2." These commands are converted to text and sent as API requests to control the devices.

---



