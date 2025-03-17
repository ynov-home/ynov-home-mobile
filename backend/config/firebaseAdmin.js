const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load service account key securely
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "config/firebaseServiceAccount.json"))
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ynov-home.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
