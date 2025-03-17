import { initializeApp } from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "id.firebaseapp.com",
  projectId: "id",
  storageBucket: "id.appspot.com",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID"
};

let app;
if (!initializeApp.apps?.length) {
  app = initializeApp(firebaseConfig);
}

export { firestore };
