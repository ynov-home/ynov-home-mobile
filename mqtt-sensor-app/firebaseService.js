import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkdS-E1g1KdLrcXwDgIsZ-ciZScqqsOz0",
  authDomain: "ynov-home.firebaseapp.com",
  databaseURL: "https://ynov-home-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ynov-home",
  storageBucket: "ynov-home.firebasestorage.app",
  messagingSenderId: "144234050265",
  appId: "1:144234050265:web:36eb39a887276b819084c8"
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
