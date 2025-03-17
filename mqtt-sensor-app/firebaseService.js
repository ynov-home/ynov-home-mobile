import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "id.firebaseapp.com",
  projectId: "id",
  storageBucket: "id.appspot.com",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDevices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "devices"));
    let devices = [];
    querySnapshot.forEach((doc) => {
      devices.push({ id: doc.id, ...doc.data() });
    });
    return devices;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export const updateDeviceStatus = async (deviceId, status) => {
  try {
    const deviceRef = doc(db, "devices", deviceId);
    await updateDoc(deviceRef, { status: status });
    console.log(`Device ${deviceId} updated to ${status}`);
  } catch (error) {
    console.error("Error updating device:", error);
  }
};
