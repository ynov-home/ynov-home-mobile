// backend/firebase.js

const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Correct the path here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-database-name>.firebaseio.com", // Replace with your actual Firebase DB URL
});

const db = admin.firestore();
module.exports = db;
